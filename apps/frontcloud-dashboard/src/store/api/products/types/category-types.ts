export interface ProductCategoryType {
    CategoryID?: number;
    parentCategory?: string;
    categoryName: string;
    url?: string;
    description?: string;
    sort_order?: number;
    images?: any;
    visibleInMenu?: boolean
    metaTitle?: string;
    metaKeywords?: string;
    metaDescription?: string;
    searchKeywords?: string;
    CreatedAt?: string;
    UpdatedAt?: string;
}