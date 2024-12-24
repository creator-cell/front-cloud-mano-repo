import { toPositiveNumber } from "@/utils/textFieldWithNumberValidation";
import * as z from "zod";


export const signUpSchema = z.object({
    firstName: z.string().min(3, "Name must be at least 3 characters long"),
    lastName: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email({ message: "Invalid email address" }),
    // phone: z.string()
    //     .min(10, "Phone must be at least 10 Numbers")
    //     .max(10)
    //     .regex(/^\d{10}$/, "Phone must contain only numbers"),
    // store: z.string().min(1, "Sore must be at least 1 characters long"),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
    StoreId: toPositiveNumber("Store Id must be an number").default(1),
    otp: z.string().min(6, "OTP must be at least 6 characters long").optional(),

}).superRefine((data) => {
    if (data.password !== data.confirmPassword) {
        return { confirmPassword: "Passwords do not match" };
    }
    return data;
}
);

export type SignUpFormValues = z.infer<typeof signUpSchema>;
