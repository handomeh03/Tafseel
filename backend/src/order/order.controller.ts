import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IsPublic } from 'src/auth/Decorators/Public.decorator';
import { getOrdersDto } from './dto/getOrders.dto';
import { Roles } from 'src/auth/Decorators/Role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/Guards/RolesGuard';
import type { Request } from 'express';
import { editOrderStatusDto } from './dto/editOrderStatus.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @IsPublic()
  @Post("create-order")
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @IsPublic()
  @Get("track/:orderNumber")
  async trackOrder(@Param('orderNumber') orderNumber: string) {
    return await this.orderService.trackOrder(orderNumber);
  }

  @Roles(Role.STORE_OWNER,Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get("get-orders")
  async getOrders(@Query() dto: getOrdersDto, @Req() req: Request) {
    const user = req['user'];
    const userId = user.sub;

    return await this.orderService.getOrders(userId, dto);
  }

  @Roles(Role.STORE_OWNER,Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get("order-stats")
  async getOrderStats(@Req() req: Request) {
    const user = req['user'];
    const userId = user.sub;

    return await this.orderService.getOrderStats(userId);
  }

  @Roles(Role.STORE_OWNER,Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Patch("edit-order")
  async editOrderstatus(@Body() editOrderStatusDto:editOrderStatusDto,@Req() req: Request){
     const user = req['user'];
    const userId = user.sub;
    return await this.orderService.editOrderStatus(userId,editOrderStatusDto)
  }

  // @Get("trace-order")
 


}
