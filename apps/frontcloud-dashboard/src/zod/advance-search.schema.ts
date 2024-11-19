import { toPositiveNumber } from "@/utils/textFieldWithNumberValidation";
import { z } from "zod";

const AdvanceSearchSchema = z.object({
    firstName: z.string()
        .optional(),

    startsWithLetter: z.string()
        .length(1, "Must be exactly one letter")
        .regex(/^[A-Za-z]$/, "Must be a letter")
        .optional(),

    brandName: z.string().optional(),

    category: z.string()
        .min(1, "At least one category must be selected")
        .optional(),

    priceRange: z.object({
        from: toPositiveNumber("Price must be a positive number").optional(),
        to: toPositiveNumber("Price must be a positive number").optional(),
    }).optional(),

    quantitySold: z.object({
        from: toPositiveNumber("Quantity must be a positive number").optional(),
        to: toPositiveNumber("Quantity must be a positive number").optional(),
    }).optional(),

    inventoryLevel: z.object({
        from: toPositiveNumber("Quantity must be a positive number").optional(),
        to: toPositiveNumber("Quantity must be a positive number").optional(),
    }).optional(),
    findBelowWarningLevel: z.boolean().optional(),

    productVisibility: z.enum(["Visible", "Hidden"]).optional(),

    featuredProduct: z.enum(["Featured", "nonFeatured"]).optional(),

    freeShipping: z.enum(["free", "paid"]).optional(),

    status: z.enum(["purchasable", "nonpurchasable", "pre-orde"]).optional(),

    sortOrder: z.object({
        order: z.enum(["Ascending", "Descending"]).optional(),
        sortBy: z.enum(["id", "name", "price", "inStock", "visible", "sku"]).optional(),
    }).optional(),
});


export type AdvanceSearchFormValues = z.infer<typeof AdvanceSearchSchema>;


export default AdvanceSearchSchema;
