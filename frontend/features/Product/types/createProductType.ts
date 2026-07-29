import { z } from "zod";
import { ProductCategory } from "./productCategory";


export const createProductSchema = z.object({
  title: z
    .string({ message: "عنوان المنتج يجب أن يكون نصًا" })
    .min(1, { message: "عنوان المنتج مطلوب" }),

  description: z
    .string({ message: "وصف المنتج يجب أن يكون نصًا" })
    .optional(),

  price: z
    .coerce
    .number({ message: "السعر يجب أن يكون رقمًا" })
    .min(0, { message: "السعر لا يمكن أن يكون أقل من صفر" }),

  category: z.enum(ProductCategory, {
    message: "يرجى اختيار تصنيف صحيح للمنتج",
  }),

  isAvailable: z
    .boolean({ message: "حالة التوفر يجب أن تكون قيمة منطقية" })
    .default(true),

  images: z
    .array(z.string({ message: "كل صورة يجب أن تكون نصًا" }))
    .optional()
    .default([]),
});

export type CreateProductFormData = z.input<typeof createProductSchema>;

export type CreateProductOutput = z.output<typeof createProductSchema>;