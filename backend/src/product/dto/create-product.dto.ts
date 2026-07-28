import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsNotEmpty,
  Min,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString({ message: 'عنوان المنتج يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'عنوان المنتج مطلوب' })
  title!: string;

  @IsString({ message: 'وصف المنتج يجب أن يكون نصًا' })
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'السعر يجب أن يكون رقمًا صحيحًا' })
  @Min(0, { message: 'السعر لا يمكن أن يكون أقل من صفر' })
  @Type(() => Number)
  price!: number;

 @IsBoolean ({ message: 'حالة التوفر يجب أن تكون قيمة منطقية (صح/خطأ)' })
  @IsOptional()
  @Type(() => Boolean)
  isAvailable?: boolean;

  @IsArray({ message: 'الصور يجب أن تكون على شكل مصفوفة' })
  @IsString({ each: true, message: 'كل صورة يجب أن تكون نصًا' })
  @IsOptional()
  images?: string[];
}