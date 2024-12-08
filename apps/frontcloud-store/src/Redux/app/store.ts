import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { RootReducer } from "../root.reduces";
import { storeCarouselApi } from "../api/storefront/carousel";
import { ProductCategoryApi } from "../api/products/category";



const ONE_DAY = 24 * 60 * 60 * 1000;


const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      storeCarouselApi.middleware,
      ProductCategoryApi.middleware
    ),
});

const persistor = persistStore(store);

setTimeout(() => {
  persistor.purge();
}, ONE_DAY);

export default store;
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
export type AppStore = ReturnType<typeof store.getState>;
