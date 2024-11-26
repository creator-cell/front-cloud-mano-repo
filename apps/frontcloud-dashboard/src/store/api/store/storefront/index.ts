import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CouponCodesResponse, HomePageCarouselData, HomePageCarouselResponse } from "./types";

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
        getCarousalById: builder.query<HomePageCarouselResponse, string>({
            query: (id) => `/carousel?StoreCarouselID=${id}`,
            providesTags: ["StoreFrontCarousel"],
        }),
        getAllCoupons: builder.query<CouponCodesResponse, void>({
            query: () => "/coupon",
        }),
        updateHomePageCarousal: builder.mutation<void, { id: number, data: any }>({
            query: ({ id, data }) => ({
                url: `/carousel/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["StoreFrontCarousel"],
        }),
        getAllHomePageCarousal: builder.query<HomePageCarouselResponse, void>({
            query: () => "/carousel",
            providesTags: ["StoreFrontCarousel"],
        }),


    })

})

export const {
    usePostSocialLinksMutation,
    useGetAllSocialLinksQuery,
    useCreateHomePageCarousalMutation,
    useGetCarousalByIdQuery,
    useUpdateHomePageCarousalMutation,
    useGetAllCouponsQuery,
    useGetAllHomePageCarousalQuery
} = StoreFrontApi