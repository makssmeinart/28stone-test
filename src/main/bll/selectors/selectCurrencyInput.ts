import { RootState } from "src/main/bll/store";

export const selectCurrencyInput = ((state: RootState) => state.currencyReducer.currencyInputField)