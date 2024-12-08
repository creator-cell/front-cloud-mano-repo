"use client";

import { combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
import { storeCarouselApi } from "./api/storefront/carousel";
import { ProductCategoryApi } from "./api/products/category";


export const RootReducer = combineReducers({
  [storeCarouselApi.reducerPath]: storeCarouselApi.reducer,
  [ProductCategoryApi.reducerPath]: ProductCategoryApi.reducer,
});
