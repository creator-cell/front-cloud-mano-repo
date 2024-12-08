import { ResponseType } from "@/Redux/types/responseType";





export type ProductCategoryType = {
    CategoryID: number;
    CategoryName: string;
    Description: string | null;
    VisibleInMenu: number; // Assuming 0 or 1 as boolean-like value
    SeoID: number | null;
    CategoryUrl: string | null;
    CategorySortBy: string | null;
    UpdatedAt: string | null; // ISO date format
    CreatedAt: string | null; // ISO date format
    MetaTitle: string | null;
    MetaDescription: string | null;
    MetaKeywords: string | null;
    SearchKeywords: string | null;
    ImageID: number | null;
    ImageURL: string | null;
    SequenceNumber: number | null;
}



export type ProductCategoryResponse = ResponseType<ProductCategoryType[]>;

export type ProductCategory = {
    categoryId?: number
    categoryName: string;
    visibleInMenu: boolean;
    description?: string;
    seo?: {
        seoId?: number
        metaTitle?: string;
        metaKeywords?: string;
        metaDescription?: string;
        searchKeywords?: string;
    } | undefined;
};
