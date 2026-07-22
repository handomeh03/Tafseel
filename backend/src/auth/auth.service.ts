import { ForbiddenException, HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/LoginDto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { isInstance } from 'class-validator';
import { CryptSecuirtyService } from 'src/security/Crypt-security.service';
import { TokensService } from 'src/security/tokens.service';



@Injectable()
export class AuthService {
  constructor(private readonly database: DatabaseService, private readonly cryptSecurityService: CryptSecuirtyService, private readonly TokensService: TokensService) { }
  async Login(LoginDto: LoginDto) {
    const { email, password } = LoginDto;
    try {

      const user = await this.database.user.findUnique({ where: { email: email } });

      if (!user) {
        throw new NotFoundException("Email or Password is incorrect ")
      }
      const isPasswordValid = await this.cryptSecurityService.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Email or password is incorrect');
      }

      const accessToken = await this.TokensService.generateAccessToken({
        id: user.id,
        role: user.role,
      });

      const RefreshToken = await this.TokensService.generateRefreshToken({
        id: user.id,
        role: user.role,
      });

      const hashRefreshToken = await this.cryptSecurityService.hash(RefreshToken, 10);

      await this.database.user.update({ where: { id: user.id }, data: { refreshToken: hashRefreshToken } });

       
      return { accessToken, RefreshToken };

    } catch (error:any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
      
    }
  }

  

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
