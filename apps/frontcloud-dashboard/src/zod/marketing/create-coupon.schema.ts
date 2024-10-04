import { z } from "zod";
import { toPositiveNumber } from "@/utils/textFieldWithNumberValidation";

const couponSchema = z.object({
    couponCode: z.string().min(1, "Coupon code is required"),
    couponName: z.string().min(1, "Coupon name is required"),
    discountType: z.string().optional(),
    discountAmount: toPositiveNumber("Discount amount must be a positive number"),
    minimumPurchase: toPositiveNumber("Minimum purchase amount must be a positive number"),
    numberOfUses: z.object({
        limitTotalUses: z.boolean().optional(),
        limitUsesPerCustomer: z.boolean().optional(),
        totalusers: toPositiveNumber("Total users must be a positive number"),
        usersPerCustomer: toPositiveNumber("Users per customer must be a positive number"),
    }),
    excludeCartLevelDiscounts: z.boolean().optional(),
    enabled: z.boolean(),
    expiration: z.date().refine(value => value > new Date(), "Expiration date must be in the future").optional(),
    coupon_applied: z.object({
        appliedTo: z.enum(["all_products", "specific_category", "specific_products"]).optional(),
        category: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })).optional(),
        products: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })).optional(),
    }),
});


export type CouponFieldvalues = z.infer<typeof couponSchema>;

export default couponSchema;
