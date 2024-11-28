import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "@/store/api/auth";
import { UserApi } from "./api/user";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { ProductCategoryApi } from "./api/products/category";
import storage from "redux-persist/lib/storage";

import SideBarSlice from "./sidebar/index";
import { ProductSubCategoryApi } from "./api/products/sub-category";
import { ProductApi } from "./api/products";
import { MarketingApi } from "./api/store/marketing";
import { BlogApi } from "./api/store/marketing/blog";
import { StoreFrontApi } from "./api/store/storefront/social-link";
import { storeFrontCarouselApi } from "./api/store/storefront/carousel";
import { BrandApi } from "./api/products/brand";
import { MarketingCouponCodeApi } from "./api/store/marketing/coupon-code";
import { LogoApi } from "./api/store/storefront/logo";

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
    [ProductSubCategoryApi.reducerPath]: ProductSubCategoryApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [MarketingApi.reducerPath]: MarketingApi.reducer,
    [BlogApi.reducerPath]: BlogApi.reducer,
    [StoreFrontApi.reducerPath]: StoreFrontApi.reducer,
    [storeFrontCarouselApi.reducerPath]: storeFrontCarouselApi.reducer,
    [BrandApi.reducerPath]: BrandApi.reducer,
    [MarketingCouponCodeApi.reducerPath]: MarketingCouponCodeApi.reducer,
    [LogoApi.reducerPath]: LogoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(AuthApi.middleware,
      UserApi.middleware,
      ProductCategoryApi.middleware,
      ProductSubCategoryApi.middleware,
      ProductApi.middleware,
      MarketingApi.middleware,
      BlogApi.middleware,
      StoreFrontApi.middleware,
      storeFrontCarouselApi.middleware,
      BrandApi.middleware,
      MarketingCouponCodeApi.middleware,
      LogoApi.middleware,
    ),
});

// Create the persistor with the `store` instance
export const persistor = persistStore(store);

// Purge persisted data after TWO_DAY milliseconds
setTimeout(() => {
  persistor.purge();
}, TWO_DAY);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

