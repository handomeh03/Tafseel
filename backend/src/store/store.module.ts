import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { EmailerModule } from 'src/emailer/emailer.module';
import { SecurityModule } from 'src/security/security.module';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports:[EmailerModule,SecurityModule]
})
export class StoreModule {}
