import { z } from "zod";
import { toPositiveNumber } from "@/utils/textFieldWithNumberValidation";

const couponSchema = z.object({
    CouponCode: z.string().min(1, "Coupon code is required"),
    CouponName: z.string().min(1, "Coupon name is required"),
    StoreId: z.string().default("1"),
    DiscountType: z.string().optional(),
    Discount: toPositiveNumber("Discount amount must be a positive number"),
    IsUseLimit: z.boolean().optional(),
    UseLimit: toPositiveNumber("Use limit must be a positive number").optional(),
    IsCustomerUseLimit: z.boolean().optional(),
    CustomerUseLimit: toPositiveNumber("Customer use limit must be a positive number").optional(),
    // minimumPurchase: toPositiveNumber("Minimum purchase amount must be a positive number"),
    // numberOfUses: z.object({
    //     limitTotalUses: z.boolean().optional(),
    //     limitUsesPerCustomer: z.boolean().optional(),
    //     totalusers: toPositiveNumber("Total users must be a positive number"),
    //     usersPerCustomer: toPositiveNumber("Users per customer must be a positive number"),
    // }),
    CartLavelDiscount: z.boolean().optional(),
    Enabled: z.boolean(),
    ExpireDate: z.date().refine(value => value > new Date(), "Expiration date must be in the future").optional(),
    CouponCondition: z.string().optional(),
    CategoryID: z.string().optional(),
    ProductID: z.string().optional(),
    // coupon_applied: z.object({
    //     appliedTo: z.enum(["all_products", "specific_category", "specific_products"]).optional(),
    //     category: z.array(z.object({
    //         label: z.string(),
    //         value: z.string(),
    //     })).optional(),
    //     products: z.array(z.object({
    //         label: z.string(),
    //         value: z.string(),
    //     })).optional(),
    // }),
});


export type CouponFieldvalues = z.infer<typeof couponSchema>;

export default couponSchema;
