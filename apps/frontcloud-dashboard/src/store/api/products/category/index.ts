import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductCategory, ProductCategoryResponse, ProductCategoryType } from "../types/category-types";

export const ProductCategoryApi = createApi({
    reducerPath: "category",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/products" }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({

        getAllCategories: builder.query<ProductCategoryResponse, void>({
            query: () => "/categories",
        }),
        postCategory: builder.mutation<ProductCategoryType, ProductCategory>({
            query: (body) => ({
                url: "/categories",
                method: "POST",
                body: body,
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
        deleteCategory: builder.mutation<void, number[]>({
            query: (ids) => ({
                url: `/categories`,
                method: "DELETE",
                body: { ids }
            }),
        }),
    }),
})

export const {
    useGetAllCategoriesQuery,
    usePostCategoryMutation,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = ProductCategoryApi;
