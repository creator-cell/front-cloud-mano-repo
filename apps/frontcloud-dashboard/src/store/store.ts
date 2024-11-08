import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "@/store/api/auth";
import { UserApi } from "./api/user";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import { ProductCategoryApi } from "./api/products/category";

export const store = () => {
  return configureStore({
    reducer: {
      [AuthApi.reducerPath]: AuthApi.reducer,
      [UserApi.reducerPath]: UserApi.reducer,
      [ProductCategoryApi.reducerPath]: ProductCategoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(AuthApi.middleware, UserApi.middleware, ProductCategoryApi.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];