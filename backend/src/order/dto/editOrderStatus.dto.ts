import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class editOrderStatusDto {

    @IsInt({ message: 'معرف الطلب يجب أن يكون رقماً صحيحاً' })
    @IsNotEmpty({ message: 'يرجى إدخال orderId' })
    orderId!: number;

    @IsEnum(OrderStatus, {
        message: 'الحالة يجب أن تكون قيمة صحيحة من حالات الطلب (قيد الانتظار، مقبول، مرفوض)',
    })
    @IsNotEmpty({ message: 'الحالة مطلوبة' })
    status!: OrderStatus;
}