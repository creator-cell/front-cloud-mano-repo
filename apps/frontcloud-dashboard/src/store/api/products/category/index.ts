import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductCategory, ProductCategoryResponse, ProductCategoryType, ProductSubCategory } from "../types/category-types";

export const ProductCategoryApi = createApi({
    reducerPath: "category",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/products" }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        postCategory: builder.mutation<ProductCategoryType, ProductCategory>({
            query: (body) => ({
                url: "/categories",
                method: "POST",
                body: body,
            }),
        }),
        postSubCategory: builder.mutation<ProductCategoryType, ProductSubCategory>({
            query: (body) => ({
                url: "/categories/sub",
                method: "POST",
                body,
            }),
        }),
        updateCategory: builder.mutation<ProductCategoryType, { CategoryID: string, body: Partial<ProductCategory> }>({
            query: ({ CategoryID, body }) => ({
                url: `/categories/${CategoryID}`,
                method: "PUT",
                body,
            }),
        }),
        getCategoryById: builder.query<ProductCategoryResponse, string>({
            query: (id) => `/categories?categoryId=${+id}`,
        }),
    }),
})

export const {
    usePostCategoryMutation,
    useGetCategoryByIdQuery,
    usePostSubCategoryMutation,
    useUpdateCategoryMutation,
} = ProductCategoryApi;
