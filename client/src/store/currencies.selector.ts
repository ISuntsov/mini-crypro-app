import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const currenciesState = (state: RootState) => state.currencies;

export const currencies = createSelector(
  currenciesState,
  (state) => state.selectedCurrencies
);
