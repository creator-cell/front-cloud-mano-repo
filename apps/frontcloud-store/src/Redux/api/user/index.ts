import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/user" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => "",
            providesTags: ["User"],
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: "",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        sendOtp: builder.mutation<any, { Email: string }>({
            query: ({ Email }) => ({
                url: "/send-otp",
                method: "POST",
                body: { Email },
            }),
        }),
        verifyOtp: builder.mutation<any, { Email: string; OTP: string }>({
            query: ({ Email, OTP }) => ({
                url: "verify-otp",
                method: "POST",
                body: { Email, OTP },
            }),
        }),
        signIn: builder.mutation<any, { Email: string; Password: string }>({
            query: ({ Email, Password }) => ({
                url: "login",
                method: "POST",
                body: { Email, Password },
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useSignInMutation
} = UserApi;
