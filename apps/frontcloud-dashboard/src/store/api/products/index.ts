import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddProductType, GetProductByIdResponse, ProductResponse } from "./types/products-types";

export const ProductApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/products" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        addProducts: builder.mutation<void, any>({
            query: (body) => ({
                url: "/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        postBulkProducts: builder.mutation<void, any[]>({
            query: (body) => ({
                url: "/importsku",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        getProducts: builder.query<ProductResponse, { storeId: number; limit: number; index: number }>({
            query: (body) => ({
                url: `/${body.storeId}?Limit=${body.limit}&Index=${body.index}`,
                method: "GET",
            }),
            providesTags: ["Products"],
        }),

        deleteProduct: builder.mutation<void, number[]>({
            query: (ids) => ({
                url: `/`,
                method: "DELETE",
                body: { ids }
            }),
            invalidatesTags: ["Products"],
        }),
        getProductById: builder.query<GetProductByIdResponse, string>({
            query: (id) => `/1/product/${+id}`,
            providesTags: ["Products"],
        }),
        updateProduct: builder.mutation<void, any>({
            query: (body) => ({
                url: "/",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
    }),
})

export const {
    useAddProductsMutation,
    useGetProductsQuery,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    usePostBulkProductsMutation
} = ProductApi;
