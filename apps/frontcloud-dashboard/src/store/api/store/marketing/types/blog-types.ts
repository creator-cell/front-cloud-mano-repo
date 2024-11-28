import { ResponseType } from "@/store/types/responseType";

export interface BlogData {
    StoreBlogID: number;
    BlogTitle: string;
    BlogBody: string | null;
    BlogAuthor: string;
    BlogTag: string | null;
    IsDraft: number;
    StoreID: number;
    SeoID: number;
    MetaTitle: string;
    MetaDescription: string;
    MetaKeywords: string;
    SearchKeywords: string;
    CreatedAt: string; // ISO Date string
    UpdatedAt: string; // ISO Date string
    ImageID: number | null;
    ImageURL: string | null;
    SequenceNumber: number | null;
}




export type StoreBlogResponse = ResponseType<BlogData[]>;
