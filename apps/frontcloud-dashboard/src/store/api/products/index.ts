import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddProductType, GetProductByIdResponse, ProductResponse } from "./types/products-types";

export const ProductApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/products" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        addProducts: builder.mutation<void, AddProductType>({
            query: (body) => ({
                url: "/products",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        getProducts: builder.query<ProductResponse, { storeId: number }>({
            query: (body) => ({
                url: `/products/${body.storeId}`,
                method: "GET",
            }),
            providesTags: ["Products"],
        }),
        deleteProduct: builder.mutation<void, number[]>({
            query: (ids) => ({
                url: `/products`,
                method: "DELETE",
                body: { ids }
            }),
            invalidatesTags: ["Products"],
        }),
        getProductById: builder.query<GetProductByIdResponse, string>({
            query: (id) => `/products/1/product/${+id}`,
            providesTags: ["Products"],
        }),
        updateProduct: builder.mutation<void, AddProductType>({
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
    useUpdateProductMutation
} = ProductApi;
