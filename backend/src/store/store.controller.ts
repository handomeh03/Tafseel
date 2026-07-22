import { Controller, Post, Body, Get, Query, Patch, Param, ParseIntPipe} from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreRequestDto } from './dto/Storerequest.dto';
import { GetAllRequestDto } from './dto/GetAllRequest.dto';
import { UpdateRequestStatusDto } from './dto/UpdateRequestStatus.dto';


@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post("request")
  async StoreRequest(@Body() StoreRequestDto :StoreRequestDto) {
    return await this.storeService.StoreRequest(StoreRequestDto);
  }

  @Get("request")
  async getAllRequest(@Query() GetAllRequestDto:GetAllRequestDto){
    return await this.storeService.getAllRequest(GetAllRequestDto);
  } 

  @Patch("request/:id/status")
  async updateRequestStatus(@Param('id', ParseIntPipe) id: number,@Body() UpdateRequestStatusDto: UpdateRequestStatusDto){
    return this.storeService.approveRequest(id,UpdateRequestStatusDto);
  }
  
}
