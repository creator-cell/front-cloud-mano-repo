import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const StoreFrontApi = createApi({
    reducerPath: "storeFront",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store/social-link" }),
    tagTypes: ["StoreFront"],
    endpoints: (builder) => ({
        PostSocialLinks: builder.mutation<void, any>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            invalidatesTags: ["StoreFront"],
        }),
        getAllSocialLinks: builder.query<any, void>({
            query: () => "",
            providesTags: ["StoreFront"],
        }),

    })

})

export const {
    usePostSocialLinksMutation,
    useGetAllSocialLinksQuery
} = StoreFrontApi