import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HomePageCarouselResponse } from "../types";

export const storeCarouselApi = createApi({
    reducerPath: "storeCarousel",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store" }),
    tagTypes: ["StoreCarousel"], // Define tag for cache invalidation
    endpoints: (builder) => ({
        // Create new carousel slide
        createHomePageCarousal: builder.mutation<void, any>({
            query: (body) => ({
                url: "/carousel",
                method: "POST",
                body,
            }),
            invalidatesTags: ["StoreCarousel"], // Invalidate cache to refetch updated list
        }),

        // Fetch a specific carousel slide by ID
        getHomePageCarousalById: builder.query<HomePageCarouselResponse, string>({
            query: (id) => `/carousel?StoreCarouselID=${id}`,
            providesTags: (result, error, id) => [{ type: "StoreCarousel", id }], // Cache based on ID
        }),

        // Update an existing carousel slide
        updateHomePageCarousal: builder.mutation<void, { id: number; data: any }>({
            query: ({ id, data }) => ({
                url: `/carousel/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                "StoreCarousel", // Invalidate global cache
                { type: "StoreCarousel", id }, // Invalidate specific ID cache
            ],
        }),

        // Fetch all carousel slides
        getAllHomePageCarousal: builder.query<HomePageCarouselResponse, void>({
            query: () => "/carousel",
            providesTags: ["StoreCarousel"], // Mark this query as providing this tag
        }),

        // Delete a specific carousel slide
        deleteHomePageCarousal: builder.mutation<void, number>({
            query: (id) => ({
                url: `/carousel?CarouselId=${id}`, // Match ID in path instead of query params
                method: "DELETE",
            }),
            invalidatesTags: ["StoreCarousel"], // Invalidate cache to refetch updated list
        }),
    }),
});

export const {
    useCreateHomePageCarousalMutation,
    useGetHomePageCarousalByIdQuery,
    useUpdateHomePageCarousalMutation,
    useGetAllHomePageCarousalQuery,
    useDeleteHomePageCarousalMutation,
} = storeCarouselApi;
