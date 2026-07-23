import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async generateAccessToken(data: any): Promise<string> {
        const payload = { sub: data.id, role: data.role };
        return this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: process.env.ACCESSTOKEN
        });
    }

    async generateRefreshToken(data: any): Promise<string> {
        const payload = { sub: data.id, role: data.role };
        return this.jwtService.signAsync(payload, {
            expiresIn: '7d',
            secret: process.env.REFRESHTOKEN
        });
    }
    async verifyAccessToken(token: string) {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESSTOKEN,
      });
   
  }

  async verifyRefreshToken(token: string) {
   
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESHTOKEN,
      });
    
    
  }
    
}