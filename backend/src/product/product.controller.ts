import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { Request } from 'express';
import { Roles } from 'src/auth/Decorators/Role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/Guards/RolesGuard';
import { getAllProductDto } from './dto/getAllProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Roles(Role.STORE_OWNER)
  @UseGuards(RolesGuard)
  @Post("create-product")
  async createProduct(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const user = req['user'];
    const ownerId = user.sub;
    return await this.productService.createProduct(createProductDto, ownerId);
  }

  @Roles(Role.STORE_OWNER)
  @UseGuards(RolesGuard)
  @Get("get-product")
  async getProduct(@Query() getAllProductDto:getAllProductDto,@Req() req: Request){
     const user = req['user'];
    const ownerId = user.sub;
    return await this.productService.getAllProduct(getAllProductDto,ownerId)
  }


  @Roles(Role.STORE_OWNER)
  @UseGuards(RolesGuard)
  @Patch("edit-product/:id")
  async editProduct(@Body() UpdateProductDto: UpdateProductDto, @Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req['user'];
    const ownerId = user.sub;
    return await this.productService.editProduct(UpdateProductDto, ownerId, id);
  }

  @Roles(Role.STORE_OWNER)
  @UseGuards(RolesGuard)
  @Delete("delete-product/:id")
  async deleteProduct(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req['user'];
    const ownerId = user.sub;
    return await this.productService.deleteProduct(ownerId, id);
  }


}
