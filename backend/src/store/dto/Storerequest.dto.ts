import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class StoreRequestDto {
  @IsString({ message: 'اسم المتجر يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'اسم المتجر مطلوب' })
  storeName!: string;

  @IsString({ message: 'اسم المالك يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'اسم المالك مطلوب' })
  ownerName!: string;

  @IsEmail({}, { message: 'يرجى إدخال بريد إلكتروني صالح' })
  @IsNotEmpty({ message: 'البريد الإلكتروني مطلوب' })
  email!: string;

  @IsString({ message: 'رقم الهاتف يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'رقم الهاتف مطلوب' })
  @Matches(/^([0-9\+\s\-]{7,15})$/, {
    message: 'يرجى إدخال رقم هاتف صالح',
  })
  phone!: string;

  @IsString({ message: 'المدينة يجب أن تكون نصًا' })
  @IsOptional()
  city?: string;

  @IsString({ message: 'الملاحظات يجب أن تكون نصًا' })
  @IsOptional()
  notes?: string;
}