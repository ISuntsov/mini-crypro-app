import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const authState = (state: RootState) => state.auth;

export const authStatusSelector = createSelector(
  authState,
  (state) => state.isAuthenticated
);
export const authAddressSelector = createSelector(
  authState,
  (state) => state.address
);
export const authErrorSelector = createSelector(
  authState,
  (state) => state.errorMessage
);
