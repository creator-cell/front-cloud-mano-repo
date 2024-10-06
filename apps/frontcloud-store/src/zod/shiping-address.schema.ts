import { toPositiveNumber } from "@/utils/textFieldWithNumberValidation";
import { z } from "zod";

const addressSchema = z.object({
    name: z.string().min(1, "Name is required"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    zipCode: toPositiveNumber("Zip Code must be at least 5 characters"),
    // zipCode: z.string().min(5, "Zip Code must be at least 5 characters").max(10, "Zip Code can't exceed 10 characters"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

export default addressSchema;