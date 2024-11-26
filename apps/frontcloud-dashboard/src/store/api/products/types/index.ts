import { ResponseType } from "@/store/types/responseType";

export interface BrandData {
    BrandID: number;
    BrandUrl: string;
    BrandName: string;
    SeoId: number;
    SeoID: number; // Keeping both for consistency with your data
    MetaTitle: string;
    MetaDescription: string | null;
    MetaKeywords: string | null;
    SearchKeywords: string | null;
    CreatedAt: string; // ISO date string
    UpdatedAt: string; // ISO date string
    ImageID: number;
    ImageURL: string;
    SequenceNumber: number;
}

export type BrandResponse = ResponseType<BrandData[]>