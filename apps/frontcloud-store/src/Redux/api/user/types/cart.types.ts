import { ResponseType } from "@/Redux/types/responseType";


export interface Cart {
    CartID: number;
    UserID: number;
    StoreID: number;
    CreatedAt: string;
    UpdatedAt: string;
    CartItem: CartItem[];
}

export interface CartItem {
    CartItemID: number;
    Quantity: number;
    Price: string;
    Discount: string;
    TotalPrice: string;
    Product: Product;
}

interface Product {
    ProductID: number;
    ProductName: string;
    SKU: string;
    StockQuantity: number;
    StorePrice: string;
    SupplierPrice: string | null;
    PriceType: string;
    DiscountType: string | null;
    ProductDiscount: number | null;
    Media: Media[];
}

export interface Media {
    MediaURL: string;
    MediaType: string;
}




export type CartResponseType = ResponseType<Cart[]>;