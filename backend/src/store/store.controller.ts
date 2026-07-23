import { Controller, Post, Body, Get, Query, Patch, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreRequestDto } from './dto/Storerequest.dto';
import { GetAllRequestDto } from './dto/GetAllRequest.dto';
import { UpdateRequestStatusDto } from './dto/UpdateRequestStatus.dto';
import { IsPublic } from 'src/auth/Decorators/Public.decorator';
import { Roles } from 'src/auth/Decorators/Role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/Guards/RolesGuard';


@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @IsPublic()
  @Post("request")
  async StoreRequest(@Body() StoreRequestDto: StoreRequestDto) {
    return await this.storeService.StoreRequest(StoreRequestDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get("request")
  async getAllRequest(@Query() GetAllRequestDto: GetAllRequestDto) {
    return await this.storeService.getAllRequest(GetAllRequestDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Patch("request/:id/status")
  async updateRequestStatus(@Param('id', ParseIntPipe) id: number, @Body() UpdateRequestStatusDto: UpdateRequestStatusDto) {
    return await this.storeService.approveRequest(id, UpdateRequestStatusDto);
  }


}
