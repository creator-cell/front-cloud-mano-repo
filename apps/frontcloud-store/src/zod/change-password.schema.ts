import * as z from 'zod';

const changePasswordSchema = z.object({
    current_password: z.string().min(8, "Current password must be at least 8 characters long"),
    new_password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
    confirm_password: z.string()
}).refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"]
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export default changePasswordSchema;
