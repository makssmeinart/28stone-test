import { RootState } from "../store";

export const selectCurrentCurrencyName = ((state: RootState) => state.currencyReducer.currentCurrencyName)