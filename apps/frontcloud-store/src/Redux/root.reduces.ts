"use client";

import { combineReducers } from "@reduxjs/toolkit";
import { UserApi } from "./api/user";
import { authApi } from "./api/auth";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import filterReducer from "./slice/filterSlice";

const persistConfigFilter = {
  key: "filter",
  storage,
};

const persistedClothingFilterReducer = persistReducer(persistConfigFilter, filterReducer)

export const RootReducer = combineReducers({
  productFilters: persistedClothingFilterReducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
