import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddProductType } from "./types/products-types";

export const ProductApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/products" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        addProducts: builder.mutation<void, AddProductType>({
            query: (body) => ({
                url: "/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
    }),
})

export const {
    useAddProductsMutation
} = ProductApi;
