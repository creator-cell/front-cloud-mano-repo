import { ResponseType } from "@/store/types/responseType";

export interface ProductCategoryType {
    CategoryID?: number;
    CategoryName: string;
    url?: string;
    Description?: string;
    sort_order?: number;
    images?: string;
    VisibleInMenu?: boolean
    seo: {
        metaTitle?: string;
        metaKeywords?: string;
        metaDescription?: string;
        searchKeywords?: string;
    }
    CreatedAt?: string;
    UpdatedAt?: string;
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
