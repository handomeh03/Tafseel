import { Global, Module } from '@nestjs/common';
import { CryptSecuirtyService } from './Crypt-security.service';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    JwtModule.register({
      global: true
    }),
  ],
  providers: [CryptSecuirtyService, TokensService],
  exports: [CryptSecuirtyService, TokensService]

})
export class SecurityModule { }
