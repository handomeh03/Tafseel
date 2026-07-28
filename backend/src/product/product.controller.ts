import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { Request } from 'express';
import { Roles } from 'src/auth/Decorators/Role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/Guards/RolesGuard';
import { getProductDto } from './dto/getProduct.dto';
import { IsPublic } from 'src/auth/Decorators/Public.decorator';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @IsPublic()
  @Get('public')
  async getPublicProducts(@Query() getProductDto: getProductDto) {
    return await this.productService.getPublicProduct(getProductDto);
  }

  @Roles(Role.STORE_OWNER)
  @UseGuards(RolesGuard)
  @Get("my-store")
  async getStoreProduct(@Query() getProductDto:getProductDto,@Req() req: Request){
     const user = req['user'];
    const userId = user.sub;
    return await this.productService.getStoreProduct(getProductDto,userId)
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get("admin-product")
  async getAdminProduct(@Query() getProductDto:getProductDto){
    return await this.productService.getAdminProduct(getProductDto)
  }


  @Roles(Role.STORE_OWNER)
  @UseGuards(RolesGuard)
  @Post("create-product")
  async createProduct(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const user = req['user'];
    const ownerId = user.sub;
    return await this.productService.createProduct(createProductDto, ownerId);
  }

  


  @Roles(Role.STORE_OWNER,Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Patch("edit-product/:id")
  async editProduct(@Body() UpdateProductDto: UpdateProductDto, @Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req['user'];
    const userId = user.sub;
    return await this.productService.editProduct(UpdateProductDto, userId, id);
  }

  @Roles(Role.STORE_OWNER,Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Delete("delete-product/:id")
  async deleteProduct(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req['user'];
    const userId = user.sub;
    return await this.productService.deleteProduct(userId, id);
  }


}
