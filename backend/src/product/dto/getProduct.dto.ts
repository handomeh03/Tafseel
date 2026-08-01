import { Type } from "class-transformer";
import { IsEnum, IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";
import { ProductCategory } from "@prisma/client";

export type ProductSortOption = "newest" | "price_asc" | "price_desc";

export class getProductDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ProductCategory, { message: "تصنيف المنتج غير صالح" })
  category?: ProductCategory;

  @IsOptional()
  @IsIn(["newest", "price_asc", "price_desc"], { message: "طريقة الترتيب غير صالحة" })
  sort?: ProductSortOption;
}