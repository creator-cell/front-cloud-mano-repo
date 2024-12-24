"use client";

import { combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
import { storeCarouselApi } from "./api/storefront/carousel";
import { ProductCategoryApi } from "./api/products/category";
import { UserApi } from "./api/user";
import { StoreApi } from "./api/store";


export const RootReducer = combineReducers({
  [storeCarouselApi.reducerPath]: storeCarouselApi.reducer,
  [ProductCategoryApi.reducerPath]: ProductCategoryApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [StoreApi.reducerPath]: StoreApi.reducer,
});
