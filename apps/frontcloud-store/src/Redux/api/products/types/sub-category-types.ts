import { ResponseType } from "@/Redux/types/responseType";


export interface SubCategoryType {
    SubCategoryID: number;
    CategoryID: number;
    SubCategoryName: string;
    Description: string; // HTML content in string format
    VisibleInMenu: number; // Could be 1 or 0, representing true or false
    CreatedAt: string; // Date in ISO format
    UpdatedAt: string; // Date in ISO format
}

export type ProductSubCategory = {
    categoryId: number
    subCategoryName: string;
    visibleInMenu: boolean;
    description?: string;
    seo?: {
        metaTitle?: string;
        metaKeywords?: string;
        metaDescription?: string;
        searchKeywords?: string;
    } | undefined;
};


export type ProductSubCategoryResponse = ResponseType<SubCategoryType[]>;