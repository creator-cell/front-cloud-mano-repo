import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MarketingBannersResponse } from "./types/banner-types";

export const MarketingApi = createApi({
    reducerPath: "marketing",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store" }),
    tagTypes: ["Marketing"],
    endpoints: (builder) => ({
        createMarketingBanner: builder.mutation<void, any>({
            query: (body) => ({
                url: "/banner",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Marketing"],
        }),
        getAllMarketingBanners: builder.query<MarketingBannersResponse, void>({
            query: () => "/banner",
            providesTags: ["Marketing"],
        }),
        deleteMarketingBanner: builder.mutation<void, string>({
            query: (ids) => ({
                url: `/banner?marketingBannerIds=${ids}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Marketing"],
        }),
    })

})

export const {
    useCreateMarketingBannerMutation,
    useGetAllMarketingBannersQuery,
    useDeleteMarketingBannerMutation
} = MarketingApi