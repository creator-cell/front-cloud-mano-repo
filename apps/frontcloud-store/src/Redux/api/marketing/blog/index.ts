import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StoreBlogResponse } from "../types/blog-types";

export const BlogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store/blog" }),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        getAllBlogs: builder.query<StoreBlogResponse, void>({
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
        updateBlog: builder.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/${id}`,
                method: "PUT",
                body: data,
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
        getBlogById: builder.query<StoreBlogResponse, string>({
            query: (id) => `?StoreBlogID=${id}`,
            providesTags: ["Blog"],
        })
    }),
})

export const {
    useGetAllBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useGetBlogByIdQuery
} = BlogApi;