import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import currenciesReducer from "./currencies.reducer";
import { cryptoApi } from "../services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currencies: currenciesReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
