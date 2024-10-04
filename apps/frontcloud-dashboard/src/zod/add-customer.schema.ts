import * as z from "zod";


const customerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string({ message: "Enter last Name ", invalid_type_error: "Name Must be a string" }).min(1, "Last name is required"),
    companyName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    customerGroup: z.string().min(1, "Customer group is required"),
    phone: z.string()
        .min(10, "Phone must be at least 3 characters long")
        .max(10., " Phone must be at most 10 characters long")
        .optional(),
    storeCredit: z.string().optional(),
    receiveACSReviewEmails: z.string().optional(),
    forcePasswordReset: z.string().optional(),
    taxExemptCode: z.string().optional(),
    password: z.string()
        .min(7, "Password must be at least 7 characters long")
        .regex(/[a-zA-Z]/, "Password must contain at least one alphabetic character")
        .regex(/\d/, "Password must contain at least one numeric character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type customerFormValues = z.infer<typeof customerSchema>;

export default customerSchema;
