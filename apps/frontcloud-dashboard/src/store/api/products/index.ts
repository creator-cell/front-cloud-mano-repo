import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/products" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({

    }),
})

export const { } = ProductApi;
