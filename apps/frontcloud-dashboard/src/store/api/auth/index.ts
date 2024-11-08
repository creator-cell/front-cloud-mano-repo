import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SessionType, SignInAPI } from "./types/auth-types";

export const AuthApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/auth" }),
  tagTypes: ["Session"],
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInAPI, any>({
      query: (data) => ({
        url: "/sign-in?role=CANDIDATE",
        method: "POST",
        body: { ...data },
      }),
    }),
    SignInWithOtp: builder.mutation<SignInAPI, { email: string; otp: number }>({
      query: (data) => ({
        url: "/sign-in-otp?role=CANDIDATE",
        method: "POST",
        body: { ...data },
      }),
    }),
    getSession: builder.query<SessionType, void>({
      query: () => "session?role=CANDIDATE",
      providesTags: ["Session"],
    }),
    signOut: builder.mutation<SessionType, void>({
      query: () => ({ url: "/sign-out", method: "POST" }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const {
  useSignInMutation,
  useGetSessionQuery,
  useSignInWithOtpMutation,
  useSignOutMutation,
} = AuthApi;
export const { getSession } = AuthApi.endpoints;
