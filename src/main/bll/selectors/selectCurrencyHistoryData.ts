import { RootState } from "../store";

export const selectCurrencyHistoryData = ((state: RootState) => state.currencyReducer.currentCurrencyInfo)