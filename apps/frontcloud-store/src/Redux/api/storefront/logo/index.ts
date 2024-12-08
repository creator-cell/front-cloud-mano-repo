import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StoreLogoResponse } from "../types";

export const LogoApi = createApi({
    reducerPath: "logoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store" }),
    tagTypes: ["Logo"],
    endpoints: (build) => ({
        getAllLogos: build.query({
            query: () => "logo",
            providesTags: ["Logo"],
        }),
        addLogo: build.mutation({
            query: (body) => ({
                url: "logo",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Logo"],
        }),
        updateLogo: build.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `logo/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Logo"],
        }),
        getLogoByStoreId: build.query<StoreLogoResponse, string>({
            query: (storeId) => `logo?StoreId=${storeId}`,
            providesTags: ["Logo"],
        })
    }),
})

export const { useGetAllLogosQuery, useAddLogoMutation, useUpdateLogoMutation, useGetLogoByStoreIdQuery } = LogoApi;