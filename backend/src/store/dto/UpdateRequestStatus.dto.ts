import { IsEnum, IsNotEmpty } from 'class-validator';
import { RequestStatus } from '@prisma/client';

export class UpdateRequestStatusDto {
  @IsEnum(RequestStatus, {
    message: 'الحالة يجب أن تكون قيمة صحيحة من حالات الطلب (قيد الانتظار، مقبول، مرفوض)',
  })
  @IsNotEmpty({ message: 'الحالة مطلوبة' })
  status!: RequestStatus;
}