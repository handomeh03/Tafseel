import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { getProductDto } from './dto/getProduct.dto';


@Injectable()
export class ProductService {
  constructor(private readonly database: DatabaseService) {}

  async createProduct(createProductDto: CreateProductDto, ownerId: number) {
    try {
      const store = await this.database.store.findUnique({
        where: { ownerId },
      });

      if (!store) {
        throw new NotFoundException('لم يتم العثور على المتجر لهذا المستخدم');
      }

      await this.database.product.create({
        data: {
          ...createProductDto,
          storeId: store.id,
        },
      });

      return { message: 'تم إنشاء المنتج بنجاح' };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        error.message || 'فشل في إنشاء المنتج',
      );
    }
  }

  async getPublicProduct(queryDto: getProductDto) {
    try {
      const { page = 1, limit = 10, search, category, sort } = queryDto;
      const skip = (page - 1) * limit;


      const where: Prisma.ProductWhereInput = {
        isAvailable: true,
      };

      if (category) {
      where.category = category;
    }

      if (search && search.trim() !== '') {
        const cleanSearch = search.trim();

        where.OR = [
          { title: { contains: cleanSearch, mode: 'insensitive' } },
          { description: { contains: cleanSearch, mode: 'insensitive' } },
          {
          store: {
            storeName: { contains: cleanSearch, mode: 'insensitive' },
          },
          }
        ];
      }

      const orderBy: Prisma.ProductOrderByWithRelationInput =
        sort === 'price_asc'
          ? { price: 'asc' }
          : sort === 'price_desc'
            ? { price: 'desc' }
            : { createdAt: 'desc' };

      const [products, totalCount] = await Promise.all([
        this.database.product.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            store: {
              select: {
                id: true,
                storeName: true,
                logo: true,
                city: true,
              },
            },
          },
        }),
        this.database.product.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      return {
        data: products,
        totalCount,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };

      
     
    } catch (error) {
      console.error('Error fetching public products:', error);
      throw new InternalServerErrorException(
        'حدث خطأ أثناء جلب المنتجات العامة',
      );
    }
  }

async getAdminProduct(queryDto: getProductDto) {
    try {
      const { page = 1, limit = 10, search,category } = queryDto;
      const skip = (page - 1) * limit;

      
      const where: Prisma.ProductWhereInput = {};

      if (category) {
      where.category = category;
    }

      if (search && search.trim() !== '') {
        const cleanSearch = search.trim();

        where.OR = [
          { title: { contains: cleanSearch, mode: 'insensitive' } },
          { description: { contains: cleanSearch, mode: 'insensitive' } },
  
          {
            store: {
              storeName: { contains: cleanSearch, mode: 'insensitive' },
            },
          },
       
        ];
      }

      const [products, totalCount] = await Promise.all([
        this.database.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            store: {
              select: {
                id: true,
                storeName: true,
                logo: true,
                city: true,
              },
            },
          },
        }),
        this.database.product.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      return {
        data: products,
        totalCount,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    } catch (error) {
      console.error('Error fetching admin products:', error);
      throw new InternalServerErrorException(
        'حدث خطأ أثناء جلب قائمة المنتجات للإدارة',
      );
    }
  }

  async getStoreProduct(queryDto: getProductDto, ownerId: number) {

    
    try {
      const store = await this.database.store.findUnique({
        where: { ownerId },
      });

      if (!store) {
        throw new NotFoundException('لم يتم العثور على المتجر لهذا المستخدم');
      }

      const { page = 1, limit = 10, search ,category} = queryDto;
      const skip = (page - 1) * limit;

      const where: Prisma.ProductWhereInput = {
        storeId: store.id,
      };

      if (category) {
      where.category = category;
    }

      if (search && search.trim() !== '') {
        const cleanSearch = search.trim();

        where.OR = [
          { title: { contains: cleanSearch, mode: 'insensitive' } },
          { description: { contains: cleanSearch, mode: 'insensitive' } },
        ];
      }

       const [products, totalCount] = await Promise.all([
        this.database.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            store: {
              select: {
                id: true,
                storeName: true,
                logo: true,
                city: true,
              },
            },
          },
        }),
        this.database.product.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      return {
        data: products,
        totalCount,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'حدث خطأ أثناء جلب المنتجات',
      );
    }
  }

  async editProduct(
  updateProductDto: UpdateProductDto,
  userId: number,
  productId: number,
) {
  try {
    const user = await this.database.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    const isAdmin = user.role === 'SUPER_ADMIN';

    const whereCondition: Prisma.ProductWhereInput = {
      id: productId,
      ...(isAdmin
        ? {} 
        : { store: { ownerId: userId } }),
    };

    
    const product = await this.database.product.findFirst({
      where: whereCondition,
    });

    if (!product) {
      throw new NotFoundException(
        'المنتج غير موجود أو ليس لديك صلاحية الوصول إليه',
      );
    }


    const updatedProduct = await this.database.product.update({
      where: { id: productId },
      data: updateProductDto,
    });

    return {
      message: 'تم تحديث المنتج بنجاح',
      data: updatedProduct,
    };
  } catch (error) {
    if (
      error instanceof NotFoundException ||
      error instanceof ForbiddenException
    ) {
      throw error;
    }

    throw new InternalServerErrorException('فشل في تحديث المنتج');
  }
}

  async getProductStats(userId: number) {
    try {
      const user = await this.database.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (!user) {
        throw new NotFoundException('المستخدم غير موجود');
      }

      let where: Prisma.ProductWhereInput = {};

      if (user.role === 'STORE_OWNER') {
        const store = await this.database.store.findUnique({
          where: { ownerId: userId },
          select: { id: true },
        });

        if (!store) {
          throw new NotFoundException('لم يتم العثور على المتجر لهذا المستخدم');
        }

        where = { storeId: store.id };
      }

      const [totalProducts, availableProducts, categoryGroups] =
        await this.database.$transaction([
          this.database.product.count({ where }),
          this.database.product.count({ where: { ...where, isAvailable: true } }),
          this.database.product.groupBy({
            by: ['category'],
            where,
            orderBy: { category: 'asc' },
            _count: true,
          }),
        ]);

      const categoryCounts = Object.fromEntries(
        categoryGroups.map((group) => [group.category, group._count]),
      );

      return {
        totalProducts,
        availableProducts,
        unavailableProducts: totalProducts - availableProducts,
        categoryCounts,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('فشل في جلب إحصائيات المنتجات');
    }
  }

  async deleteProduct(userId: number, productId: number) {
  try {
    
    const user = await this.database.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    const isAdmin = user.role === 'SUPER_ADMIN' ;

  
    const whereCondition: Prisma.ProductWhereInput = {
      id: productId,
      ...(isAdmin
        ? {} 
        : { store: { ownerId: userId } }), 
    };

  
    const product = await this.database.product.findFirst({
      where: whereCondition,
    });

    if (!product) {
      throw new NotFoundException(
        'المنتج غير موجود أو ليس لديك صلاحية الوصول إليه',
      );
    }

  
    await this.database.product.delete({
      where: { id: productId },
    });

    return { message: 'تم حذف المنتج بنجاح' };
  } catch (error) {
    if (
      error instanceof NotFoundException ||
      error instanceof ForbiddenException
    ) {
      throw error;
    }

    throw new InternalServerErrorException('فشل في حذف المنتج');
  }
}
}