import { ResponseType } from "@/store/types/responseType";

export interface AddProductType {
    product: {
        ProductName: string;
        SKU?: string;
        ProductType?: string;
        Brand?: string;
        ManufacturePartNumber?: string;
        ProductUPC?: string;
        GlobalTradeItemNumber?: string;
        CategoryID: string;
        SubCategoryID?: string;
        StoreID: string;
        Description?: string;
        IsDropShipped?: boolean;
    };
    productDimensions: {
        Weight: number;
        Height: number;
        Width: number;
        Depth?: number;
    };
    productTax: {
        TaxClass?: string;
        TaxProviderTaxCode?: string;
    };
    productInventory: {
        StockQuantity: number;
        BinPickingNumber?: string;
        MinPurchaseQty?: number;
        MaxPurchaseQty?: number;
    };
    productPricing: {
        StorePrice: number;
        SupplierPrice?: number;
        PriceType?: string;
        DiscountType?: string;
    };
    productShipping: {
        ShippingType: string,
        ShippingCost: number,
        ShippingWeight: number,
        ShippingHeight: number,
        ShippingWidth: number,
        ShippingDepth: number,
    };
    seo: {
        MetaTitle?: string;
        MetaDescription?: string;
        MetaKeywords?: string;
        Url?: string;
    };
}



export interface Product {
    ProductID: number;
    ProductName: string;
    SKU: string;
    StockQuantity: number;
    StorePrice: string;
    SupplierPrice: string;
    PriceType: string;
    DiscountType: string;
}

export interface Pagination {
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export type ProductResponse = ResponseType<{ products: Product[]; pagination: Pagination; }>;
export type GetProductByIdResponse = ResponseType<AddProductType>;