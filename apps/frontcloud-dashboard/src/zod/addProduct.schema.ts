import { toPositiveNumber } from "@/utils/textFieldWithNumberValidation";
import * as z from "zod";


export const AddProductFormSchemaNew = z.object({
    Product: z.object({
        productName: z.string().min(3, "Name must be at least 3 characters long"),
        SKU: z.string().min(2, "SKU must be at least 3 characters long").optional(),
        productType: z.string().min(3, "Type must be at least 3 characters long").optional(),
        Brand: z.string().min(3, "Brand must be at least 3 characters long").optional(),
        ManufacturePartNumber: z.string().min(3, "Manufacture Part Number must be at least 3 characters long").optional(),
        ProductUPC: z.string().min(3, "Product UPC must be at least 3 characters long").optional(),
        GlobalTradeItemNumber: z.string().min(3, "Global Trade Item Number must be at least 3 characters long").optional(),
        CategoryID: z.string().min(3, "Category ID must be at least 3 characters long"),
        SubCategoryID: z.string().min(3, "Sub Category ID must be at least 3 characters long").optional(),
        StoreID: z.string().min(1, "Store ID must be at least 3 characters long"),
        Description: z.string().min(3, "Description must be at least 3 characters long").optional(),
        IsDropShipped: z.boolean().optional(),
    }),
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
    }),
    ProductShipping: z.object({
        ShippingType: z.string().min(3, "Shipping Type must be at least 3 characters long").optional(),
        ShippingPrice: toPositiveNumber("Shipping Price must be a positive number").optional(),
        Weight: toPositiveNumber("Weight must be a positive number"),
        Height: toPositiveNumber("Height must be a positive number"),
        Width: toPositiveNumber("Width must be a positive number"),
        Depth: toPositiveNumber("Depth must be a positive number").optional(),
    }),
    Seo: z.object({
        MetaTitle: z.string().min(3, "Meta Title must be at least 3 characters long").optional(),
        MetaDescription: z.string().min(3, "Meta Description must be at least 3 characters long").optional(),
        MetaKeywords: z.string().min(3, "Meta Keywords must be at least 3 characters long").optional(),
        Url: z.string().min(3, "URL must be at least 3 characters long").optional(),
    }),

})


export type addProductFormValuesNew = z.infer<typeof AddProductFormSchemaNew>;


export const AddProductFormSchema = z.object({
    visibleToStorefront: z.boolean().optional(),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    SKU: z.string().min(2, "SKU must be at least 3 characters long").optional(),
    type: z.string().min(3, "Type must be at least 3 characters long").optional(),
    defaultPriceExcludingTax: toPositiveNumber("Default price must be a positive number"),
    brand: z.string().min(3, "Brand must be at least 3 characters long").optional(),
    weight: toPositiveNumber("Weight must be a positive number").optional(),
    category: z.string().min(3, "Category must be at least 3 characters long").optional(),
    subCategory: z.string().min(3, "Sub Category must be at least 3 characters long").optional(),
    description: z.string().min(3, "Description must be at least 3 characters long").optional(),


    productIdentifiers: z.object({
        sku: z.string().optional(),
        manufacturerPartNumber: z.string().optional(),
        UPC_EAN: z.string().optional(),
        globalTradeItemNumber: z.string().optional(),
        binPickingNumber: z.string().optional(),
    }),


    pricing: z.object({
        defaultPrice: toPositiveNumber("Default Price must be a positive number"),
        taxClass: z.string().min(3, "Tax Class must be at least 3 characters long").optional(),
        cost: toPositiveNumber("Cost must be a positive number").optional(),
        MSRP: toPositiveNumber("MSRP must be a positive number").optional(),
        salePrice: toPositiveNumber("Sale Price must be a positive number").optional(),
        taxProviderTaxCode: z
            .string()
            .min(3, "Tax Provider Tax Code must be at least 3 characters long")
            .optional(),
    }).optional(),


    bulkPricing: z.object({
        overallDiscount: toPositiveNumber("Overall Discount must be  a number").optional(),
        discountedQuantity: toPositiveNumber("Quantity must be a number").optional(),
    }),

    track_inventory: z.boolean().optional(),

    variantOption: z.array(z.object({
        optionName: z.enum(["color", "size"]), // e.g., Color, Size
        optionType: z.enum(["switch", "radio", "dropdown"]), // The type of input control
        optionValues: z
            .array(z.string().min(1, "Option value is required"))
            .refine((values) => {
                const trimmedValues = values.map(value => value.trim()); // Ensure trimming
                return new Set(trimmedValues).size === trimmedValues.length;
            }, {
                message: "Duplicate option values are not allowed",
                // path: ["optionValues"],
            }),
        // optionValues: z.set(z.string())
    })).optional(), // Optional, in case some variants don’t have options

    variations: z.array(
        z.object({
            SKU: z.string().min(3, "SKU must be at least 3 characters long."),
            weight: toPositiveNumber("Weight must be a positive number."),
            quantity: toPositiveNumber("Quantity must be a positive number."),
            height: toPositiveNumber("Height must be a positive number.").optional(),
            width: toPositiveNumber("Width must be a positive number.").optional(),
            length: z.number().positive("Length must be a positive number.").optional(),
            images: z.array(z.instanceof(File)).optional(), // Optional images
            tags: z.array(z.string()).min(1, "Please add at least one tag.").optional(), // Optional tags
            purchasable: z
                .string()
                .min(3, "Purchase Note must be at least 3 characters long.")
                .optional(),
            variant: z
                .string()
                .min(3, "Variant must be at least 3 characters long.")
                .optional(),
            variantOption: z.array(z.object({
                optionName: z.enum(["color", "size"]), // e.g., Color, Size
                optionType: z.enum(["switch", "radio", "dropdown"]), // The type of input control
                optionValues: z
                    .set(z.string().min(1, "Option value is required"))

            })).optional(),

            productIdentifiers: z.object({
                sku: z.string().min(3, "Product Identifier SKU must be at least 3 characters long."),
                manufacturerPartNumber: z
                    .string()
                    .min(3, "Manufacturer Part Number must be at least 3 characters long."),
                UPC_EAN: z.string().min(3, "UPC/EAN must be at least 3 characters long."),
                globalTradeItemNumber: z
                    .string()
                    .min(3, "Global Trade Item Number (GTIN) must be at least 3 characters long."),
                binPickingNumber: z
                    .string()
                    .min(3, "Bin Picking Number must be at least 3 characters long."),
            }),

            pricing: z.object({
                defaultPrice: toPositiveNumber("Default Price must be a positive number"),
                taxClass: z.string().min(3, "Tax Class must be at least 3 characters long").optional(),
                cost: toPositiveNumber("Cost must be a positive number").optional(),
                MSRP: toPositiveNumber("MSRP must be a positive number").optional(),
                salePrice: toPositiveNumber("Sale Price must be a positive number").optional(),
                taxProviderTaxCode: z
                    .string()
                    .min(3, "Tax Provider Tax Code must be at least 3 characters long")
                    .optional(),
            }).optional(),
        })
    ).optional(),

    tags: z.array(z.string()).min(1, "Please add at least one tag").optional(),
    sortOrder: toPositiveNumber("SOR Order must be a number").optional(),
    templateLayoutFile: z.string().min(3, "Template Layout File must be at least 3 characters long").optional(),
    warrentyInfo: z.string().min(3, "Warrenty Info must be at least 3 characters long").optional(),
    availabilityText: z.string().min(3, "Availability Text must be at least 3 characters long").optional(),
    condition: z.string().min(3, "Condition must be at least 3 characters long").optional(),
    showRelatedProducts: z.string().min(3, "Short Related Products must be at least 3 characters long").optional(),

    dimensionsWeight: z.object({
        weight: toPositiveNumber("Weight must be a number"),
        width: toPositiveNumber("Width must be a number"),
        height: toPositiveNumber("Height must be a number"),
        depth: toPositiveNumber("Depth must be a number").optional(),
    }).optional(),

    fixedShipingPrice: toPositiveNumber("Fixed Shipping Price must be a a number").optional(),
    purchaseablity: z.string().min(3, "Purchaseablity must be at least 3 characters long").optional(),
    minPurchaseQuantity: toPositiveNumber("Min Purchase Quantity must b a number").optional(),
    maxPurchaseQuantity: toPositiveNumber("Max Purchase Quantity must b a number").optional(),

    giftWrapping: z.object({
        giftWrapping: z.boolean().optional().optional(),
        giftWrappingPrice: toPositiveNumber("Gift Wrapping Price must b a number").optional(),
        giftWrappingDescription: z.string().min(3, "Gift Wrapping Description must be at least 3 characters long").optional(),
        giftWrappingOptions: z.string().min(1, "Please add at least one gift wrapping option").optional(),
    }).optional(),

    seo: z.object({
        metaTitle: z.string().min(3, "Meta Title must be at least 3 characters long").optional(),
        metaDescription: z.string().min(3, "Meta Description must be at least 3 characters long").optional(),
        metaKeywords: z.string().min(3, "Meta Keywords must be at least 3 characters long").optional(),
        url: z.string().min(3, "URL must be at least 3 characters long").optional(),
    }),
    images: z.array(z.any()).optional(),

});


export type addProductFormValues = z.infer<typeof AddProductFormSchema>;

