import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { StoreModule } from './store/store.module';
import { EmailerModule } from './emailer/emailer.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, SecurityModule, StoreModule, EmailerModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
