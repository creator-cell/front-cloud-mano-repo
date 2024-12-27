import { ResponseType } from "@/store/types/responseType";

interface SubCategory {
    SubCategoryID: number;
    SubCategoryName: string;
    SubCategoryUrl: string | null;
    SCDescription: string;
    SCVisibleInMenu: number;
}

export interface ProductCategoryType {
    CategoryID: number;
    CategoryName: string;
    Description: string;
    VisibleInMenu: number;
    SeoID: string | null;
    CategoryUrl: string | null;
    CategorySortBy: string | null;
    StoreID: number;
    UpdatedAt: string | null;
    CreatedAt: string | null;
    MetaTitle: string | null;
    MetaDescription: string | null;
    MetaKeywords: string | null;
    SearchKeywords: string | null;
    ImageID: string | null;
    ImageURL: string | null;
    SequenceNumber: number | null;
    SubCategory: SubCategory[];
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
