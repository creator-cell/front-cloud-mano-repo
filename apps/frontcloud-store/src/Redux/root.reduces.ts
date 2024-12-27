"use client";

import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { storeCarouselApi } from "./api/storefront/carousel";
import { ProductCategoryApi } from "./api/products/category";
import { UserApi } from "./api/user";
import { StoreApi } from "./api/store";
import userReducer from "@/Redux/api/user/slice/user.slice";

// Persist configuration for user data
const userDataPersistConfig = {
  key: "userData",
  storage,
};

// Wrap userReducer with persistReducer
const persistedUserReducer = persistReducer(userDataPersistConfig, userReducer);

// Combine all reducers
export const RootReducer = combineReducers({
  userData: persistedUserReducer,
  [storeCarouselApi.reducerPath]: storeCarouselApi.reducer,
  [ProductCategoryApi.reducerPath]: ProductCategoryApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [StoreApi.reducerPath]: StoreApi.reducer,
});
