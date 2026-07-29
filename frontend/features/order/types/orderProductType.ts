import { z } from "zod";

const jordanPhoneRegex = /^(?:\+?962|0)?7[789]\d{7}$/;

export const createOrderSchema = z.object({
  customerName: z
    .string({ message: "اسم الزبون يجب أن يكون نصاً" })
    .min(1, { message: "يرجى إدخال اسم الزبون" }),

  customerPhone: z
    .string({ message: "رقم الهاتف يجب أن يكون نصاً" })
    .min(1, { message: "يرجى إدخال رقم الهاتف" })
    .regex(jordanPhoneRegex, {
      message: "يرجى إدخال رقم هاتف صحيحي معتمد (مثال: 0791234567)",
    }),

  city: z
    .string({ message: "اسم المدينة يجب أن يكون نصاً" })
    .min(1, { message: "يرجى تحديد المدينة / المحافظة" }),

  shippingAddress: z
    .string({ message: "العنوان يجب أن يكون نصاً" })
    .min(1, { message: "يرجى إدخال عنوان التوصيل بالتفصيل" }),

  notes: z
    .string({ message: "الملاحظات يجب أن تكون نصاً" })
    .optional(),

  productId: z.union([z.string(), z.number()], {
    message: "يرجى اختيار المنتج",
  }),

  quantity: z
    .number({ message: "الكمية يجب أن تكون رقماً صحيحاً" })
    .int({ message: "الكمية يجب أن تكون رقماً صحيحاً" })
    .min(1, { message: "أقل كمية للطلب هي قطعة واحدة" }),
});


export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;