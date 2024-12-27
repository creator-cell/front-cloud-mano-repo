import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MarketingBannersResponse } from "./types/banner-types";
import { get } from "http";

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
                url: `/banner?MarketingBannerIds=${ids}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Marketing"],
        }),
        CreateCoupon: builder.mutation<void, any>({
            query: (body) => ({
                url: "/coupon",
                method: "POST",
                body,
            }),
        }),
        getBannerById: builder.query<MarketingBannersResponse, string>({
            query: (id) => `/banner?MarketingBannerId=${id}`,
        }),
        updateBanner: builder.mutation<void, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/banner/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Marketing"],
        }),

    })

})

export const {
    useCreateMarketingBannerMutation,
    useGetAllMarketingBannersQuery,
    useDeleteMarketingBannerMutation,
    useCreateCouponMutation,
    useGetBannerByIdQuery,
    useUpdateBannerMutation,
    useLazyGetBannerByIdQuery
} = MarketingApi