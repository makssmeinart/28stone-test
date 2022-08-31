import { RootState } from "../store";

export const selectHistoryTime = ((state: RootState) => state.currencyReducer.currencyHistoryTime)