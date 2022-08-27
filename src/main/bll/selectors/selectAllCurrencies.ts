import { RootState } from "../store";

export const selectAllCurrencies = ((state : RootState) => state.currencyReducer.allCurrencies)