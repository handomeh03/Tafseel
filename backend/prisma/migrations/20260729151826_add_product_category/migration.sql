-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('SOFAS', 'TABLES', 'BEDROOMS', 'DECOR', 'OTHER');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "ProductCategory" NOT NULL DEFAULT 'OTHER';
