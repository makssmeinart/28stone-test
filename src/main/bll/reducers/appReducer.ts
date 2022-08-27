import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitStateTypes = {
    errorMessage: null,
    status: "idle",
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateErrorMessage: (state, payload: PayloadAction<string>) => {
            state.errorMessage = payload.payload
        }
    },
})

// Action Creators 

export const updateErrorMessage = appSlice.actions.updateErrorMessage

export const appReducer = appSlice.reducer

// Types

type PendingStatusType = "idle" | "failed" | "completed" | "loading";
type InitStateTypes = {
    errorMessage: string | null;
    status: PendingStatusType;
};