import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString({ message: 'اسم الزبون يجب أن يكون نصاً' })
  @IsNotEmpty({ message: 'يرجى إدخال اسم الزبون' })
  customerName!: string;

  @IsString({ message: 'رقم الهاتف يجب أن يكون نصاً' })
  @IsNotEmpty({ message: 'يرجى إدخال رقم الهاتف' })
  @Matches(/^(?:\+?962|0)?7[789]\d{7}$/, {
    message: 'يرجى إدخال رقم هاتف صحيحي معتمد',
  })
  customerPhone!: string;

  @IsString({ message: 'اسم المدينة يجب أن يكون نصاً' })
  @IsNotEmpty({ message: 'يرجى تحديد المدينة / المحافظة' })
  city!: string;

  @IsString({ message: 'العنوان يجب أن يكون نصاً' })
  @IsNotEmpty({ message: 'يرجى أدخال عنوان التوصيل بالتفصيل' })
  shippingAddress!: string;

  @IsOptional()
  @IsString({ message: 'الملاحظات يجب أن تكون نصاً' })
  notes?: string;

  @Type(() => Number)
  @IsInt({ message: 'معرف المنتج يجب أن يكون رقماً صحيحاً' })
  @IsNotEmpty({ message: 'يرجى اختيار المنتج' })
  productId!: number;

  @Type(() => Number)
  @IsInt({ message: 'الكمية يجب أن تكون رقماً صحيحاً' })
  @Min(1, { message: 'أقل كمية للطلب هي قطعة واحدة' })
  quantity!: number;
}