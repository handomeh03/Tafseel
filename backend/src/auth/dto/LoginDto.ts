import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'البريد الإلكتروني يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'البريد الإلكتروني مطلوب' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'يرجى إدخال بريد إلكتروني صالح',
  })
  email!: string;

  @IsString({ message: 'كلمة المرور يجب أن تكون نصًا' })
  @IsNotEmpty({ message: 'كلمة المرور مطلوبة' })
  password!: string;
}