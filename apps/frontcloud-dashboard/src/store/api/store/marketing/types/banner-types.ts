import { ResponseType } from "@/store/types/responseType";


export interface MarketingBanner {
    MarketingBannerID: number;
    MarketingBannerName: string;
    Content: string;
    StoreID: number;
    Location: string;
    CategoryID: number;
    DateRange: number;
    StartDate: string; // ISO date string
    EndDate: string;   // ISO date string
    Visible: number;
    Placement: string;
    CreatedAt: string; // ISO date string
    UpdatedAt: string; // ISO date string
    StoreName: string;
    OwnerName: string;
    TotalSales: number;
    CategoryName: string;
    Description: string; // HTML content
    VisibleInMenu: number;
    SeoID: number | null;
    CategoryUrl: string | null;
    CategorySortBy: number | null;
    ImageID: number;
    ItemID: number;
    ItemType: string;
    SequenceNumber: number;
    ImageURL: string;
}

// For the API response structure
export type MarketingBannersResponse = ResponseType<MarketingBanner[]>
