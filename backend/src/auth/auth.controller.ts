import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/LoginDto';
import type { Request, Response } from 'express';
import { IsPublic } from './Decorators/Public.decorator';
import { changePasswordDto } from './dto/changePassword.dto';
import { Roles } from './Decorators/Role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from './Guards/RolesGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @IsPublic()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, RefreshToken,role } = await this.authService.Login(loginDto);

    response.cookie('refreshToken', RefreshToken, {
      httpOnly: true, //to prevent js to access refresh token (xss)
      secure: false, // to enable http to send refresh token without https
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return {accessToken,role};
  }

  @Roles(Role.STORE_OWNER,Role.STORE_OWNER)
  @UseGuards(RolesGuard)
  @Patch("change-password")
  async changepassword(@Body() changePasswordDto:changePasswordDto,@Req() req: Request){
    const user = req['user'];
    const userId = user.sub;
     return await this.authService.changePassword(changePasswordDto,userId)
  }

 
  @Get("me")
  async getme( @Req() req: Request){
     const user = req['user'];
    const userId = user.sub;
    return await this.authService.getme(userId);

  }


}
