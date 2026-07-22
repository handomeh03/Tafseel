import { Injectable } from '@nestjs/common';
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
}