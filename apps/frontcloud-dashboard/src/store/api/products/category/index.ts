import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductCategoryType } from "../types/category-types";

export const ProductCategoryApi = createApi({
    reducerPath: "category",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/products" }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        postCategory: builder.mutation<ProductCategoryType, Partial<ProductCategoryType>>({
            query: (body) => ({
                url: "/categories",
                method: "POST",
                body,
            }),
        }),
        postSubCategory: builder.mutation<ProductCategoryType, Partial<ProductCategoryType>>({
            query: (body) => ({
                url: "/categories/sub",
                method: "POST",
                body,
            }),
        }),
        updateCategory: builder.mutation<ProductCategoryType, { CategoryID: string, body: Partial<ProductCategoryType> }>({
            query: ({ CategoryID, body }) => ({
                url: `/categories/${CategoryID}`,
                method: "PUT",
                body: { CategoryID, ...body },
            }),
        }),
        getCategory: builder.query<ProductCategoryType, string>({
            query: (id) => `/categories/${id}`,
        }),
    }),
})

export const {
    usePostCategoryMutation,
    useGetCategoryQuery,
    usePostSubCategoryMutation,
    useUpdateCategoryMutation,
} = ProductCategoryApi;
