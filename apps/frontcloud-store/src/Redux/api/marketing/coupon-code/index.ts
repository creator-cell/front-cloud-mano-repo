import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MarketingCouponCodeApi = createApi({
    reducerPath: "couponcode",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store" }),
    tagTypes: ["CouponCode"],
    endpoints: (builder) => ({
        CreateCoupon: builder.mutation<void, any>({
            query: (body) => ({
                url: "/coupon",
                method: "POST",
                body,
            }),
            invalidatesTags: ["CouponCode"],
        }),
        deleteCouponCode: builder.mutation<void, string>({
            query: (ids) => ({
                url: `/coupon?StoreCouponIDs=${ids}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CouponCode"],
        }),
        getAllCouonCodes: builder.query<any, void>({
            query: () => ({
                url: "/coupon",
                method: "GET",
            }),
            providesTags: ["CouponCode"],
        }),
    })
})

export const {
    useCreateCouponMutation,
    useDeleteCouponCodeMutation,
    useGetAllCouonCodesQuery
} = MarketingCouponCodeApi