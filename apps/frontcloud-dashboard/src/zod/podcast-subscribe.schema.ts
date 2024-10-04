import * as z from "zod";


export const subscribeSchema = z.object({
    firstName: z.string().min(3, "Name must be at least 3 characters long"),
    lastName: z.string().min(3, "Name must be at least 3 characters long"),
    buisness_email: z.string().email({ message: "Invalid email address" }),
    company_name: z.string().min(1, "Company Name must be at least 3 characters long"),
    phone: z.string()
        .min(10, "Phone must be at least 10 number ")
        .max(10)
        .regex(/^\d{10}$/, "Phone must contain only numbers"),
    store: z.string().min(1, "Sore must be at least 3 characters long"),
    buisness_location: z.string().min(1, "Select Your Buisness Location"),
    anual_revenue: z.string().min(1, "Select Your Buisness Revenue"),

});

export type SubscribeFormValues = z.infer<typeof subscribeSchema>;
