import { toPositiveNumber } from "@/utils/textFieldWithNumberValidation";
import * as z from "zod";


export const AddProductFormSchemaNew = z.object({
    Product: z.object({
        ProductName: z.string().min(3, "Name must be at least 3 characters long"),
        SKU: z.string().min(2, "SKU must be at least 3 characters long").optional(),
        ProductType: z.string().min(3, "Type must be at least 3 characters long").optional(),
        Brand: z.string().min(3, "Brand must be at least 3 characters long"),
        ManufacturePartNumber: z.string().min(3, "Manufacture Part Number must be at least 3 characters long"),
        ProductUPC: z.string().min(3, "product UPC must be at least 3 characters long").optional(),
        GlobalTradeItemNumber: z.string().min(3, "Global Trade Item Number must be at least 3 characters long"),
        CategoryID: z.string().min(1, "Category ID must be at least 3 characters long"),
        SubCategoryID: z.string().min(1, "Sub Category ID must be at least 3 characters long").optional(),
        StoreID: z.string().min(1, "Store ID must be at least 3 characters long").default("1"),
        Description: z.string().min(3, "Description must be at least 3 characters long").optional(),
        IsDropShipped: z.boolean().optional().default(false),
    }),
    Media: z.array(z.any()).optional(),
    // Media: z.array(z.any()).min(1, "At least one media file is required"),
    ProductDimensions: z.object({
        Weight: toPositiveNumber("Weight must be a positive number"),
        Height: toPositiveNumber("Height must be a positive number"),
        Width: toPositiveNumber("Width must be a positive number"),
        Depth: toPositiveNumber("Depth must be a positive number").optional(),
    }),
    ProductTax: z.object({
        TaxClass: z.string().min(3, "Tax Class must be at least 3 characters long").optional(),
        TaxProviderTaxCode: z.string().min(3, "Tax Provider Tax Code must be at least 3 characters long").optional(),
    }),
    ProductInventory: z.object({
        StockQuantity: toPositiveNumber("Stock Quantity must be a positive number"),
        BinPickingNumber: z.string().min(3, "Bin Picking Number must be at least 3 characters long").optional(),
        MinPurchaseQty: toPositiveNumber("Min Purchase Quantity must be a positive number").optional(),
        MaxPurchaseQty: toPositiveNumber("Max Purchase Quantity must be a positive number").optional(),
    }),
    ProductPricing: z.object({
        StorePrice: toPositiveNumber("Store Price must be a positive number"),
        SupplierPrice: toPositiveNumber("Supplier Price must be a positive number").optional(),
        PriceType: z.string().min(3, "Price Type must be at least 3 characters long").optional(),
        DiscountType: z.string().min(3, "Discount Type must be at least 3 characters long").optional(),
        Discount: toPositiveNumber("Discount must be a positive number").optional(),
    }),
    ProductShipping: z.object({
        ShippingType: z.string().min(3, "Shipping Type must be at least 3 characters long").optional(),
        ShippingPrice: toPositiveNumber("Shipping Price must be a positive number").optional(),
        ShippingWeight: toPositiveNumber("Weight must be a positive number"),
        ShippingHeight: toPositiveNumber("Height must be a positive number"),
        ShippingWidth: toPositiveNumber("Width must be a positive number"),
        ShippingDepth: toPositiveNumber("Depth must be a positive number").optional(),
    }),
    Seo: z.object({
        MetaTitle: z.string().min(3, "Meta Title must be at least 3 characters long").optional(),
        MetaDescription: z.string().min(3, "Meta Description must be at least 3 characters long").optional(),
        MetaKeywords: z.string().min(3, "Meta Keywords must be at least 3 characters long").optional(),
        SearchKeywords: z.string().min(3, "Search Keywords must be at least 3 characters long").optional(),

    }),

})


export type addProductFormValuesNew = z.infer<typeof AddProductFormSchemaNew>;

