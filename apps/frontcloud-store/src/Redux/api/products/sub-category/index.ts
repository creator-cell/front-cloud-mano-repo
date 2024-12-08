import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductSubCategory, ProductSubCategoryResponse } from "../types/sub-category-types";

export const ProductSubCategoryApi = createApi({
    reducerPath: "subCategory",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/products/categories" }),
    tagTypes: ["SubCategory"],
    endpoints: (builder) => ({
        getAllSubCategories: builder.query<ProductSubCategoryResponse, void>({
            query: () => "/sub",
            providesTags: ["SubCategory"],
        }),
        postSubCategory: builder.mutation<{ message: string }, ProductSubCategory>({
            query: (body) => ({
                url: "/sub",
                method: "POST",
                body,
            }),
            invalidatesTags: ["SubCategory"],
        }),
        updateSubCategory: builder.mutation<{ message: string }, { CategoryID: string, body: Partial<ProductSubCategory> }>({
            query: ({ CategoryID, body }) => ({
                url: `/sub/${CategoryID}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["SubCategory"],
        }),
        getSubCategoryById: builder.query<ProductSubCategoryResponse, string>({
            query: (id) => `/sub/?subCategoryId=${+id}`,
        }),
        deleteSubCategory: builder.mutation<{ message: string }, number[]>({
            query: (ids) => ({
                url: `/sub`,
                method: "DELETE",
                body: { ids }
            }),
            invalidatesTags: ["SubCategory"],
        }),
    }),
})

export const {
    useGetAllSubCategoriesQuery,
    useGetSubCategoryByIdQuery,
    usePostSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation,
} = ProductSubCategoryApi;
