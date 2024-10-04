import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SendOTPAPI } from "./types/user.types";

export const UserApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/user" }),
  endpoints: (builder) => ({
    createuser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/USER`,
        method: "POST",
        body: { ...data },
      }),
    }),
    getuserById: builder.query<any, string>({
      query: (userId) => `${userId}`,
    }),
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: `/USER`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    sendOtp: builder.mutation<SendOTPAPI, string>({
      query: (email) => ({
        url: `/sendotp`,
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation<SendOTPAPI, { email: string, otp: number }>({
      query: ({ email, otp }) => ({
        url: `/verifyotp`,
        method: "POST",
        body: { email, otp },
      }),
    }),

  }),
});

export const {
  useCreateuserMutation,
  useGetuserByIdQuery,
  useUpdateProfileMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = UserApi;
