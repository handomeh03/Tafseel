import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class StoreRequestDto {
  @IsString({ message: 'Store name must be a string' })
  @IsNotEmpty({ message: 'Store name is required' })
  storeName!: string;

  @IsString({ message: 'Owner name must be a string' })
  @IsNotEmpty({ message: 'Owner name is required' })
  ownerName!: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^([0-9\+\s\-]{7,15})$/, {
    message: 'Please provide a valid phone number',
  })
  phone!: string;

  @IsString({ message: 'City must be a string' })
  @IsOptional()
  city?: string;

  @IsString({ message: 'Notes must be a string' })
  @IsOptional()
  notes?: string;
}