import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CouponCodesResponse, HomePageCarouselData, HomePageCarouselResponse } from "./types";

export const StoreFrontApi = createApi({
    reducerPath: "storeFront",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store" }),
    tagTypes: ["StoreFront"],
    endpoints: (builder) => ({
        PostSocialLinks: builder.mutation<void, any>({
            query: (body) => ({
                url: "/social-link",
                method: "POST",
                body,
            }),
            invalidatesTags: ["StoreFront"],
        }),
        getAllSocialLinks: builder.query<any, void>({
            query: () => "/social-link",
            providesTags: ["StoreFront"],
        }),

        getAllCoupons: builder.query<CouponCodesResponse, void>({
            query: () => "/coupon",
        }),
    })

})

export const {
    usePostSocialLinksMutation,
    useGetAllSocialLinksQuery,
    useGetAllCouponsQuery,
} = StoreFrontApi