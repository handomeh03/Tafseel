import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { getAllProductDto } from './dto/getAllProduct.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly database: DatabaseService) { }

  async createProduct(createProductDto: CreateProductDto, ownerId: number) {
    try {
      const store = await this.database.store.findUnique({
        where: { ownerId },
      });

      if (!store) {
        throw new NotFoundException('Store not found for this user');
      }

      await this.database.product.create({
        data: {
          ...createProductDto,
          storeId: store.id,
        },
      });

      return { message: 'Product created successfully' };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(error.message || 'Failed to create product');
    }
  }

  async getAllProduct(queryDto: getAllProductDto, ownerId: number) {
    try {
      const store = await this.database.store.findUnique({
        where: { ownerId },
      });

      if (!store) {
        throw new NotFoundException('Store not found for this user');
      }

      const { page = 1, limit = 10, search } = queryDto;
      const skip = (page - 1) * limit;

      const where: Prisma.ProductWhereInput = {
        storeId: store.id,
      };

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
        'An error occurred while getting all products',
      );
    }
  }

  async editProduct(updateProductDto: UpdateProductDto, ownerId: number, productId: number) {
    try {
      const product = await this.database.product.findFirst({
        where: {
          id: productId,
          store: {
            ownerId: ownerId,
          },
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found or access denied');
      }


      await this.database.product.update({
        where: { id: productId },
        data: updateProductDto,
      });

      return { message: 'Product updated successfully' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async deleteProduct(ownerId: number, productId: number) {
    try {
      const product = await this.database.product.findFirst({
        where: {
          id: productId,
          store: {
            ownerId: ownerId,
          },
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found or access denied');
      }

      await this.database.product.delete({
        where: { id: productId },
      });

      return { message: 'Product deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete product');
    }
  }
}