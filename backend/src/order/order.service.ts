import { BadRequestException, ForbiddenException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { DatabaseService } from 'src/database/database.service';
import { OrderStatus, Prisma, Role } from '@prisma/client';
import { generateUniqueOrderNumber } from 'src/utils/generateUniqueOrderNumber';
import { getOrdersDto } from './dto/getOrders.dto';
import { editOrderStatusDto } from './dto/editOrderStatus.dto';

@Injectable()
export class OrderService {

  constructor(private readonly database:DatabaseService){}
async createOrder(createOrderDto: CreateOrderDto) {
  const { productId, quantity, customerPhone, ...rest } = createOrderDto;

  const product = await this.database.product.findUnique({
    where: { id: productId },
    select: { id: true, price: true, isAvailable: true },
  });

  if (!product) {
    throw new NotFoundException('المنتج المطلوب غير موجود');
  }

  if (!product.isAvailable) {
    throw new BadRequestException('عذراً، هذا المنتج غير متوفر حالياً للطلب');
  }

  
  const unitPrice = product.price;
  const itemTotalPrice = unitPrice * quantity;
  const deliveryPrice = 15.0; 
  const totalPrice = itemTotalPrice + deliveryPrice;


  const orderNumber = generateUniqueOrderNumber();

  
   await this.database.order.create({
    data: {
      orderNumber,
      customerPhone: customerPhone.trim(),
      ...rest,
      productId,
      quantity,
      unitPrice,
      deliveryPrice,
      totalPrice,
      status: OrderStatus.PENDING,
    },
    
  });

  return {message: 'تم إنشاء الطلب بنجاح'};
}

// for superadmin and storeowner
async getOrders(userId: number, dto: getOrdersDto) {
  try {
    const { page = 1, limit = 10, search } = dto;
    const skip = (page - 1) * limit;

    
    const user = await this.database.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    const whereConditions: any[] = [];

    
    if (user.role === Role.STORE_OWNER) {
      const store = await this.database.store.findFirst({
        where: { ownerId: user.id },
        select: { id: true },
      });

      if (!store) {
        throw new NotFoundException('لم يتم العثور على متجر مرتبط بهذا الحساب');
      }

      whereConditions.push({
        product: { storeId: store.id },
      });
    } else if (user.role !== Role.SUPER_ADMIN) {
      throw new ForbiddenException('ليس لديك صلاحية للوصول إلى قائمة الطلبات');
    }

    
    if (search && search.trim() !== '') {
      const query = search.trim();

      whereConditions.push({
        OR: [
          { orderNumber: { contains: query, mode: 'insensitive' } },
          { customerName: { contains: query, mode: 'insensitive' } },
          { customerPhone: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
          { product: { title: { contains: query, mode: 'insensitive' } } },
        ],
      });
    }

    const whereClause = whereConditions.length > 0 ? { AND: whereConditions } : {};

    
    const [orders, totalOrders] = await this.database.$transaction([
      this.database.order.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          orderNumber: true,
          status: true,
          customerName: true,
          customerPhone: true,
          city: true,
          shippingAddress: true,
          notes: true,
          quantity: true,
          unitPrice: true,
          deliveryPrice: true,
          totalPrice: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              title: true,
              images: true,
              price: true,
              store: {
                select: {
                  id: true,
                  storeName: true,
                },
              },
            },
          },
        },
      }),
      this.database.order.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    return {
      data: orders,
      totalOrders,
      currentPage: page,
      totalPages,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  } catch (error) {
     if (error instanceof HttpException ) {
      throw error;
    }

    throw new InternalServerErrorException('فشل في جلب قائمة الطلبات');
  }
}

  // for superadmin and storeowner
  async editOrderStatus( userId: number, editOrderStatusDto: editOrderStatusDto) {
  try {
    const { orderId, status } = editOrderStatusDto;

    
    const user = await this.database.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    const isAdmin = user.role === Role.SUPER_ADMIN;

    const whereCondition: Prisma.OrderWhereInput = {
      id: orderId,
      ...(isAdmin
        ? {}
        : { product: { store: { ownerId: userId } } }),
    };


    const order = await this.database.order.findFirst({
      where: whereCondition,
    });

    if (!order) {
      throw new NotFoundException('الطلب غير موجود أو ليس لديك صلاحية الوصول إليه' );
    }

   
    await this.database.order.update({
      where: { id: orderId },
      data: { status },
    });

    return {
      message: 'تم تحديث حالة الطلب بنجاح',
      
    };
  } catch (error) {
    if (error instanceof HttpException ) {
      throw error;
    }

    throw new InternalServerErrorException('فشل في تحديث حالة الطلب');
  }
}


  
}
