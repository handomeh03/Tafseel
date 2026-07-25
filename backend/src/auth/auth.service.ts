import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/LoginDto';
import { DatabaseService } from 'src/database/database.service';
import { CryptSecuirtyService } from 'src/security/Crypt-security.service';
import { TokensService } from 'src/security/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly cryptSecurityService: CryptSecuirtyService,
    private readonly TokensService: TokensService,
  ) {}

  async Login(LoginDto: LoginDto) {
    const { email, password } = LoginDto;

    try {
      const user = await this.database.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new NotFoundException(
          'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        );
      }

      const isPasswordValid = await this.cryptSecurityService.compare(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException(
          'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        );
      }

      const accessToken = await this.TokensService.generateAccessToken({
        id: user.id,
        role: user.role,
      });

      const RefreshToken = await this.TokensService.generateRefreshToken({
        id: user.id,
        role: user.role,
      });

      const hashRefreshToken =
        await this.cryptSecurityService.hash(RefreshToken, 10);

      await this.database.user.update({
        where: { id: user.id },
        data: { refreshToken: hashRefreshToken },
      });

      return {
        accessToken,
        RefreshToken,
        role: user.role,
      };
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى لاحقًا',
      );
    }
  }

async getme(userId: number) {
    try {
      const user = await this.database.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          store: {
            select: {
              id: true,         
              storeName: true,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException("المستخدم غير موجود");
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      
     
      throw new InternalServerErrorException("حدث خطأ في السيرفر أثناء جلب بيانات المستخدم");
    }
  }
}