import { ResponseType } from "@/store/types/responseType";

export interface MarketingBanner {
    MarketingBannerID: number;
    MarketingBannerName: string;
    Content: string;
    StoreID: number;
    Location: string;
    CategoryID: number | null;
    DateRange: number;
    StartDate: string | null;
    EndDate: string | null;
    Visible: number;
    Placement: string;
    CreatedAt: string;
    UpdatedAt: string;
    StoreName: string;
    OwnerName: string;
    TotalSales: number;
    CategoryName: string | null;
    Description: string | null;
    VisibleInMenu: number | null;
    SeoID: string | null;
    ImageID: number;
    ItemID: number;
    ItemType: string;
    SequenceNumber: number;
    ImageURL: string;
}

// For the API response structure
export type MarketingBannersResponse = ResponseType<MarketingBanner[]>
