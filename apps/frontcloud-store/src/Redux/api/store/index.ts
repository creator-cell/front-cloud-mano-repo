import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StoreHomeData } from "./types/store.types";

export const StoreApi = createApi({
    reducerPath: "storeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store" }),
    tagTypes: ["Store"],
    endpoints: (builder) => ({
        getStoreHome: builder.query<StoreHomeData, void>({
            query: () => "home/1",
            providesTags: ["Store"],
        }),

    }),
})

export const { useGetStoreHomeQuery } = StoreApi;