import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrencies } from "./currencyReducer";

const initialState: InitStateTypes = {
    errorMessage: null,
    status: "idle",
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateErrorMessage: (state, payload: PayloadAction<string | null>) => {
            state.errorMessage = payload.payload
        },
        updateStatus: (state, payload: PayloadAction<PendingStatusType>) => {
            state.status = payload.payload
        }

    },
})

// Action Creators 

export const updateErrorMessage = appSlice.actions.updateErrorMessage
export const updateStatus = appSlice.actions.updateStatus

export const appReducer = appSlice.reducer

// Types

type PendingStatusType = "idle" | "failed" | "completed" | "loading";
type InitStateTypes = {
    errorMessage: string | null;
    status: PendingStatusType;
};