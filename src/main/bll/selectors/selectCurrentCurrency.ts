import { RootState } from "../store";

export const selectCurrentCurrency = ((state: RootState) => state.currencyReducer.currentCurrency)