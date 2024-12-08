import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const StoreFrontApi = createApi({
    reducerPath: "storeFront",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store" }),
    tagTypes: ["StoreFrontSocialLinks"],
    endpoints: (builder) => ({
        PostSocialLinks: builder.mutation<void, any>({
            query: (body) => ({
                url: "/social-link",
                method: "POST",
                body,
            }),
            invalidatesTags: ["StoreFrontSocialLinks"],
        }),
        getAllSocialLinks: builder.query<any, void>({
            query: () => "/social-link",
            providesTags: ["StoreFrontSocialLinks"],
        }),
        deleteSocialLink: builder.mutation<void, string>({
            query: (id) => ({
                url: `/social-link?StoreSocialLinkID=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["StoreFrontSocialLinks"],
        }),
    })

})

export const {
    usePostSocialLinksMutation,
    useGetAllSocialLinksQuery,
    useDeleteSocialLinkMutation
} = StoreFrontApi