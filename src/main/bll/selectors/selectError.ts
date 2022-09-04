import { RootState } from "../store";

export const selectError = ((state: RootState) => state.appReducer.errorMessage)