// import { configureStore } from "@reduxjs/toolkit";
// import { AuthApi } from "@/store/api/auth";
// import { UserApi } from "./api/user";
// import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
// import { ProductCategoryApi } from "./api/products/category";
// import storage from "redux-persist/lib/storage";

// import SideBarSlice from "./sidebar/index";

// const persistConfig = {
//   key: "userPackage",
//   storage: storage,
// }

// const TWO_DAY = 24 * 2 * 60 * 60 * 1000;

// const persistedSidebarReducer = persistReducer(persistConfig, SideBarSlice);

// export const store = () => {
//   return configureStore({
//     reducer: {
//       sidebar: persistedSidebarReducer,
//       [AuthApi.reducerPath]: AuthApi.reducer,
//       [UserApi.reducerPath]: UserApi.reducer,
//       [ProductCategoryApi.reducerPath]: ProductCategoryApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }).concat(AuthApi.middleware, UserApi.middleware, ProductCategoryApi.middleware),
//   });
// };

// const persistor = persistStore(store());

// setTimeout(() => {
//   persistor.purge();
// }, TWO_DAY);


// export type AppStore = ReturnType<typeof store>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];




import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "@/store/api/auth";
import { UserApi } from "./api/user";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { ProductCategoryApi } from "./api/products/category";
import storage from "redux-persist/lib/storage";

import SideBarSlice from "./sidebar/index";

const persistConfig = {
  key: "userPackage",
  storage: storage,
};

const TWO_DAY = 24 * 2 * 60 * 60 * 1000;

const persistedSidebarReducer = persistReducer(persistConfig, SideBarSlice);

// Create the store instance directly
export const store = configureStore({
  reducer: {
    sidebar: persistedSidebarReducer,
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

// Create the persistor with the `store` instance
export const persistor = persistStore(store);

// Purge persisted data after TWO_DAY milliseconds
setTimeout(() => {
  persistor.purge();
}, TWO_DAY);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

