import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class changePasswordDto {
  @IsString({ message: 'كلمة السر القديمة يجب أن تكون نصية' })
  @IsNotEmpty({ message: 'يرجى إدخال كلمة السر القديمة' })
  oldPassword!: string;

  @IsString({ message: 'كلمة السر الجديدة يجب أن تكون نصية' })
  @IsNotEmpty({ message: 'يرجى إدخال كلمة السر الجديدة' })
  @MinLength(8, { message: 'كلمة السر الجديدة يجب أن لا تقل عن 8 أحرف' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'كلمة السر يجب أن تحتوي على حرف كبير (A-Z)، حرف صغير (a-z)، رقم (0-9)، ورمز خاص (@$!%*?&)',
    },
  )
  newPassword!: string;
}