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
import { setupListeners } from "@reduxjs/toolkit/query";
import { RootReducer } from "../root.reduces";
import { storeCarouselApi } from "../api/storefront/carousel";
import { ProductCategoryApi } from "../api/products/category";
import { UserApi } from "../api/user";
import { StoreApi } from "../api/store";

const ONE_DAY = 24 * 60 * 60 * 1000; // Milliseconds in a day
const PERSIST_KEY = "redux-persist-timestamp";

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      storeCarouselApi.middleware,
      ProductCategoryApi.middleware,
      UserApi.middleware,
      StoreApi.middleware
    ),
});

// const persistor = persistStore(store);

// // Clear stale persisted state if it's older than one day
// const purgeIfExpired = () => {
//   const lastPersistTime = parseInt(localStorage.getItem(PERSIST_KEY) || "0", 10);
//   const currentTime = Date.now();

//   if (currentTime - lastPersistTime > ONE_DAY) {
//     persistor.purge();
//     localStorage.setItem(PERSIST_KEY, currentTime.toString());
//   }
// };
// purgeIfExpired();

setupListeners(store.dispatch);

export default store;
// export { persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
