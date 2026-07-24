import { 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsArray, 
  IsNotEmpty, 
  Min 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString({ message: 'Title must be a text string' })
  @IsNotEmpty({ message: 'Product title is required' })
  title!: string;

  @IsString({ message: 'Description must be a text string' })
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'Price must be a valid number' })
  @Min(0, { message: 'Price cannot be negative' })
  @Type(() => Number)
  price!: number;

  @IsArray({ message: 'Images must be provided as an array' })
  @IsString({ each: true, message: 'Each image must be a valid string' })
  @IsOptional()
  images?: string[];
}