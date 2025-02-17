import {
  bindActionCreators,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

interface CurrenciesState {
  selectedCurrencies: string[];
}

const initialState: CurrenciesState = {
  selectedCurrencies: [],
};

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    setSelectedCurrencies(state, action: PayloadAction<string[]>) {
      state.selectedCurrencies = action.payload;
    },
  },
});

export const actions = { ...currenciesSlice.actions };

export const useActionsCurrencies = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

export default currenciesSlice.reducer;
