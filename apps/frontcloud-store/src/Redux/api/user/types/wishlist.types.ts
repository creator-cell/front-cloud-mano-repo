import { ResponseType } from "@/Redux/types/responseType";

interface WishlistResponse {
    Success: boolean;
    Message: string;
    Data: WishlistData[];
}

export interface WishlistData {
    WishlistID: number;
    UserID: number;
    StoreID: number;
    CreatedAt: string;
    UpdatedAt: string;
    Wishlist: WishlistItem[];
}

export interface WishlistItem {
    WishlistItemID: number;
    AddedAt: string;
    Product: WishListProduct;
}

export interface WishListProduct {
    ProductName: string;
    SKU: string;
    StockQuantity: number;
    StorePrice: string;
    SupplierPrice: string | null;
    PriceType: string;
    DiscountType: string | null;
    Discount: number | null;
    Media: Media[];
}

interface Media {
    MediaUrl: string;
    MediaType: string;
}


export type WishlistResponseType = ResponseType<WishlistData[]>;