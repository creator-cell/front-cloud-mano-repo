import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BlogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store/blog" }),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => "blogs",
            providesTags: ["Blog"],

        }),
        createBlog: builder.mutation({
            query: (data) => ({
                url: ``,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Blog"],
        }),
        udateBlog: builder.mutation<any, string>({
            query: (id) => ({
                url: `?blogId${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Blog"],
        }),
        deleteBlog: builder.mutation<any, string>({
            query: (id) => ({
                url: `?BlogIds=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
})

export const {
    useGetAllBlogsQuery,
    useCreateBlogMutation,
    useUdateBlogMutation,
    useDeleteBlogMutation
} = BlogApi;