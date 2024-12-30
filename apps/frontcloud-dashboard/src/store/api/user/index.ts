import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    Certification,
    CreateUserDto,
    Education,
    Experience,
    Project,
    ResponseType,
    User,
} from "./types/user-types";

export const UserApi = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/user" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({

    }),
});

export const {

} = UserApi;

