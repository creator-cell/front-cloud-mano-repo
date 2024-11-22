import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CouponCodesResponse, HomePageCarouselData } from "./types";

export const StoreFrontApi = createApi({
    reducerPath: "storeFront",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store" }),
    tagTypes: ["StoreFront", "StoreFrontCarousel"],
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
        createHomePageCarousal: builder.mutation<void, any>({
            query: (body) => ({
                url: "/carousel",
                method: "POST",
                body,
            }),
            invalidatesTags: ["StoreFrontCarousel"],
        }),
        getAllCoupons: builder.query<CouponCodesResponse, void>({
            query: () => "/coupon",
        }),
    })

})

export const {
    usePostSocialLinksMutation,
    useGetAllSocialLinksQuery,
    useCreateHomePageCarousalMutation,
    useGetAllCouponsQuery
} = StoreFrontApi