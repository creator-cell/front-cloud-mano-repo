import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SessionType, SignInAPI } from "./types/auth-types";

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
  }),
});

export const {
  useSignUpMutation
} = AuthApi;

