import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BrandResponse } from "../types";

export const BrandApi = createApi({
    reducerPath: "brand",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/products/brand" }),
    tagTypes: ["Brand"],
    endpoints: (builder) => ({
        getAllBrands: builder.query<BrandResponse, void>({
            query: () => "",
        }),
        postBrand: builder.mutation<{ Message: string }, any>({
            query: (body) => ({
                url: "",
                method: "POST",
                body: body,
            }),
        }),
        updateBrand: builder.mutation<any, { BrandID: string, body: Partial<any> }>({
            query: ({ BrandID, body }) => ({
                url: `/${BrandID}`,
                method: "PUT",
                body,
            }),
        }),
        getBrandById: builder.query<any, string>({
            query: (id) => `?brandId=${+id}`,
        }),
        deleteBrands: builder.mutation<void, string>({
            query: (ids) => ({
                url: `?BrandIds=${ids}`,
                method: "DELETE",
                body: { ids }
            }),
        }),
    }),
})

export const {
    useGetAllBrandsQuery,
    usePostBrandMutation,
    useGetBrandByIdQuery,
    useUpdateBrandMutation,
    useDeleteBrandsMutation,
} = BrandApi;