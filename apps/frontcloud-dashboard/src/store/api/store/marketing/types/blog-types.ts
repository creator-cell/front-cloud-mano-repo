import { ResponseType } from "@/store/types/responseType";

// export interface StoreBlog {
//     StoreBlogID: number;
//     BlogTitle: string;
//     BlogBody: string;
//     BlogAuthor: string;
//     BlogTag: string; // Consider converting this to a string array type if possible: `string[]`
//     IsDraft: number; // 1 for draft, 0 for published
//     StoreID: number;
//     SeoID: number;
//     ImageID: number;
//     ItemID: number;
//     ItemType: string; // Likely a fixed set of values, consider using a union type: `'blog' | 'article' | ...`
//     SequenceNumber: number;
//     ImageURL: string;
//     CreatedAt: string; // ISO Date string
//     UpdatedAt: string; // ISO Date string
// }

export type BlogData = {
    StoreBlogID: number;
    BlogTitle: string;
    BlogBody: string | null;
    BlogAuthor: string;
    BlogTag: string | null;
    IsDraft: number;
    StoreID: number;
    SeoID: number;
    ImageID: number | null;
    ImageURL: string | null;
    SequenceNumber: number | null;
}

export type StoreBlogResponse = ResponseType<BlogData[]>;
