import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddtoCartPayloadType, UserResponse, userSignInResponse } from "./types/user.types";
import { setUser } from "./slice/user.slice";
import { CartResponseType } from "./types/cart.types";
import { WishlistResponseType } from "./types/wishlist.types";

export const UserApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/user" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, void>({
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
        signIn: builder.mutation<userSignInResponse, { Email: string; Password: string, StoreID: number }>({
            query: ({ Email, Password, StoreID }) => ({
                url: "login",
                method: "POST",
                body: { Email, Password, StoreID },
            }),
            async onQueryStarted({ }, { dispatch, queryFulfilled }: { dispatch: any, queryFulfilled: Promise<{ data: userSignInResponse }> }) {
                try {
                    const { data } = await queryFulfilled; // Wait for the mutation to complete
                    console.log("🚀 ~ onQueryStarted ~ data:", data)
                    dispatch(setUser(data)); // Store the User object in Redux
                } catch (error) {
                    console.error("Error during sign-in:", error);
                }
            },
        }),
        addToCart: builder.mutation<any, AddtoCartPayloadType>({
            query: ({ ProductId, Quantity, UserId, StoreId }) => ({
                url: "/cart",
                method: "POST",
                body: { ProductId, Quantity, UserId, StoreId },
            }),
        }),

        getAllCartItems: builder.query<CartResponseType, void>({
            query: () => ({
                url: `/cart`,
                method: "GET",
            }),
        }),

        addToWishList: builder.mutation<any, Omit<AddtoCartPayloadType, "Quantity">>({
            query: ({ ProductId, UserId, StoreId }) => ({
                url: "/wishlist",
                method: "POST",
                body: { ProductId, UserId, StoreId },
            }),
        }),

        getAllWishListItems: builder.query<WishlistResponseType, void>({
            query: () => ({
                url: `/wishlist`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useSignInMutation,
    useAddToCartMutation,
    useGetAllCartItemsQuery,
    useAddToWishListMutation,
    useGetAllWishListItemsQuery
} = UserApi;
