import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SessionType, SignInAPI, SignInResponse } from "./types/auth-types";

export const AuthApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/store" }),
  tagTypes: ["Session"],
  endpoints: (builder) => ({
    signUp: builder.mutation<any, any>({
      query: (body) => ({
        url: ``, // signup url
        method: "POST",
        body,
      }),
    }),
    verifyAccount: builder.mutation<any, { token: string }>({
      query: ({ token }) => ({
        url: `/verify`,
        method: "POST",
        body: { Token: token },
      }),
    }),

    signIn: builder.mutation<SignInResponse, { Email: string, Password: string }>({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Session"],
    }),

  }),
});

export const {
  useSignUpMutation,
  useVerifyAccountMutation,
  useSignInMutation
} = AuthApi;

