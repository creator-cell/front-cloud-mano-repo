import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { SessionType, SignInAPI, SignOutAPI } from "./types/auth.types";
// import { setUserData } from "@/store/slices/user";
export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/auth" }),
    tagTypes: ["Session"],
    endpoints: (builder) => ({
        signIn: builder.mutation<any, any>({
            query: (data) => ({
                url: `/sign-in?role=USER`,
                method: "POST",
                // body: { ...data },
            }),
            invalidatesTags: ["Session"],
            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            //     try {

            //         const result = await queryFulfilled;
            //         dispatch(
            //             setUserData(result.data.User)
            //         )
            //     } catch (err) {
            //         console.error(err);
            //     }
            // }

        }),


        getSession: builder.query<any, void>({
            query: () => 'session?role=USER',
            providesTags: ["Session"],
        }),

        signOut: builder.mutation<any, void>({
            query: () => ({
                url: `/sign-out`,
                method: "POST",
            }),
            invalidatesTags: ["Session"],
        }),

        forgotPassword: builder.mutation<any, { email: string, newPassword: string }>({
            query: ({ email, newPassword }) => ({
                url: `/user/forgotpassword`,
                method: "PATCH",
                body: { email, newPassword },
            }),
            invalidatesTags: ["Session"],
        }),
        changePassword: builder.mutation<any, Omit<any, 'confirmPassword'>>({
            query: (data) => ({
                url: `/user/change-password`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Session"],
        })
    }),
})

export const {
    useSignInMutation,
    useGetSessionQuery,
    useSignOutMutation,
} = authApi

export const { getSession } = authApi.endpoints