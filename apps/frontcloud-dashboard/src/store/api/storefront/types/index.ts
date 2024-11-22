import { ResponseType } from "@/store/types/responseType";

export interface HomePageCarouselData {
    carouselHeading: string;
    carouselText: string;
    btnText: string;
    carouselLink: string;
    image: Array<File | string>;
    playTime: number;
    storeID: string;
}


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