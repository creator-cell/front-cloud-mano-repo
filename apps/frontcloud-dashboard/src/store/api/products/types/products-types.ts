export interface AddProductType {
    Product: {
        productName: string;
        SKU?: string;
        productType?: string;
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
    ProductDimensions: {
        Weight: number;
        Height: number;
        Width: number;
        Depth?: number;
    };
    ProductTax: {
        TaxClass?: string;
        TaxProviderTaxCode?: string;
    };
    ProductInventory: {
        StockQuantity: number;
        BinPickingNumber?: string;
        MinPurchaseQty?: number;
        MaxPurchaseQty?: number;
    };
    ProductPricing: {
        StorePrice: number;
        SupplierPrice?: number;
        PriceType?: string;
        DiscountType?: string;
    };
    ProductShipping: {
        ShippingType?: string;
        ShippingPrice?: number;
        Weight: number;
        Height: number;
        Width: number;
        Depth?: number;
    };
    Seo: {
        MetaTitle?: string;
        MetaDescription?: string;
        MetaKeywords?: string;
        Url?: string;
    };
}
