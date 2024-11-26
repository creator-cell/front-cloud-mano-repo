import { ResponseType } from "@/store/types/responseType";

export type HomePageCarouselData = {
    StoreCarouselID: number;
    CarouselHeading: string;
    CarouselText: string;
    BtnText: string;
    CarouselLink: string;
    PlayTime: number;
    StoreID: number;
    ImageID: number;
    ItemID: number;
    ItemType: string;
    SequenceNumber: number;
    ImageURL: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export type HomePageCarouselResponse = ResponseType<HomePageCarouselData[]>;


export type Coupon = {
    StoreCouponID: number;
    StoreID: number | null;
    CouponCode: string;
    CouponName: string;
    DiscountType: string;
    Discount: number;
    IsUseLimit: number;
    UseLimit: number | null;
    IsCustomerUseLimit: number;
    CustomerUseLimit: number | null;
    CartLavelDiscount: number;
    Enabled: number;
    ExpireDate: string;
    CouponCondition: string;
};

export type CouponCodesResponse = ResponseType<Coupon[]>;