import * as z from "zod";
export const storeRequestSchema = z.object({
  storeName: z
    .string({ message: "اسم المتجر مطلوب" })
    .min(1, "اسم المتجر مطلوب"),
  ownerName: z
    .string({ message: "اسم المالك مطلوب" })
    .min(1, "اسم المالك مطلوب"),
  email: z
    .string({ message: "البريد الإلكتروني مطلوب" })
    .email("يرجى إدخال بريد إلكتروني صحيح"),
  phone: z
    .string({ message: "رقم الموبايل مطلوب" })
    .regex(/^([0-9\+\s\-]{7,15})$/, "يرجى إدخال رقم موبايل صحيح "),
  city: z.string().optional(),
  notes: z.string().optional(),
});

export type StoreRequestFormData = z.infer<typeof storeRequestSchema>;