import { Module } from '@nestjs/common';
import { EmailerService } from './emailer.service';


@Module({
  exports:[EmailerService],
  providers: [EmailerService],
})
export class EmailerModule {}
