export interface StoreHomeData {
    message: string;
    Data: {
        AllCategory: Category[];
        BestOf: {
            CategoryID: number;
            CategoryName: string;
            Product: StoreProductType[];
        };
        Coupon: Coupon[];
        MostSelling: StoreProductType[];
        Random: {
            CategoryID: number;
            CategoryName: string;
            Product: StoreProductType[];
        };
    };
}


interface Category {
    id: number;
    name: string;
    [key: string]: any; // Allow additional fields for flexibility
}

export interface StoreProductType {
    id: number;
    name: string;
    price: number;
    description?: string;
    SKU?: string;
    StockQuantity?: number;
    StorePrice?: string;
    SupplierPrice?: string | null;
    PriceType?: string;
    DiscountType?: string | null;
    Discount?: number | null;
    MediaID?: number;
    SequenceNumber?: number;
    MediaURL?: string;
    MediaType?: string;
    [key: string]: any; // Allow additional fields for flexibility
}


interface Coupon {
    id: number;
    code: string;
    discount: number;
    [key: string]: any; // Allow additional fields for flexibility
}
