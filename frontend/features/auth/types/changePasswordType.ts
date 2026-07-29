import { z } from "zod";


const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "يرجى إدخال كلمة السر الحالية" }),
    newPassword: z
      .string()
      .min(8, { message: "كلمة السر الجديدة يجب أن لا تقل عن 8 أحرف" })
      .regex(passwordRegex, {
        message:
          "كلمة السر يجب أن تحتوي على حرف كبير (A-Z)، حرف صغير (a-z)، رقم (0-9)، ورمز خاص (@$!%*?&)",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "يرجى إدخال تأكيد كلمة السر الجديدة" }),
  })
  
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمة السر الجديدة وتأكيدها غير متطابقين",
    path: ["confirmPassword"],
  })

  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "كلمة السر الجديدة يجب أن تكون مختلفة عن كلمة السر الحالية",
    path: ["newPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;