import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { StoreModule } from './store/store.module';
import { EmailerModule } from './emailer/emailer.module';
import { ProductModule } from './product/product.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/Guards/AuthGuard';
import { OrderModule } from './order/order.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppThrottlerGuard } from './auth/Guards/AppThrottlerGuard';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
  }), ThrottlerModule.forRoot([{
    name: 'global',
    ttl: 60000,
    limit: 200,
    
  }]), AuthModule, SecurityModule, StoreModule, EmailerModule, ProductModule, OrderModule,],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AppThrottlerGuard,
  }, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule { }
