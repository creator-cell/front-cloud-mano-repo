import { toPositiveNumber } from "@/utils/textFieldWithNumberValidation";
import * as z from "zod";

export const signUpSchema = z.object({
    FirstName: z.string()
        .min(1, "First name is required")
        .max(100, "First name must not exceed 100 characters"),
    LastName: z.string()
        .min(1, "Last name is required")
        .max(100, "Last name must not exceed 100 characters"),
    Email: z.string()
        .email("Invalid email address"),
    Phone: z.string()
        .regex(/^\d+$/, "Phone number must contain only numbers")
        .refine((val) => val.length >= 10 && val.length <= 15, {
            message: "Phone number must be between 10 and 15 digits",
        }),
    Password: z.string()
        .min(12, "Password must be at least 12 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),
    Business: z.string()
        .refine((val) =>
            ['50k', '50k to 250k', '250k to 1m', '1m to 20m', '20m to 50m', '50m to 100m', '100m+', 'none'].includes(val),
            {
                message: "Invalid business size. Allowed values are: '50k', '50k to 250k', '250k to 1m', '1m to 20m', '20m to 50m', '50m to 100m', '100m+', or 'none'.",
            }
        ),
    Hosted: z.string()
        .refine((val) => ['NorthAmerica', 'Europe', 'AsiaPacific'].includes(val), {
            message: "Invalid store hosted location. Allowed values are: 'NorthAmerica', 'Europe', and 'AsiaPacific'.",
        }),
    StoreName: z.string()
        .min(1, "Store name is required")
        .max(100, "Store name must not exceed 100 characters"),
    Location: z.string()
        .min(1, "Location is required")
        .max(255, "Location must not exceed 255 characters").optional(),
    TotalSales: toPositiveNumber("Total sales must be a valid integer").optional(),
    recaptcha: z.string().optional(),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
