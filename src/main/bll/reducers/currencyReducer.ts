import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { currencyApi, CurrentCurrencyInfoPayloadType } from "src/main/dal/currencyApi"
import { RootState } from "../store"

const initialState: InitialStateType = {
    currencyInputField: "",
    allCurrencies: null,
    currentCurrencyInfo: null,
    currentCurrencyName: null,
    currencyHistoryTime: "15min",
}

export const fetchCurrencies = createAsyncThunk("currency/fetchCurrencies", async () => {
    try {
        const currencyData: CurrencyType[] = await currencyApi.fetchCurrenciesData()
        return currencyData
    }
    catch (e) {
        // TODO change the error reducer
        throw (e)
    }
})

export const fetchCurrentCurrencyInfo = createAsyncThunk("currency/fetchCurrentCurrencyInfo", async ({}, { getState }) => {
    const { currencyReducer } = getState() as RootState
    const { currentCurrencyName, currencyHistoryTime } = currencyReducer

    const formatedCurrency = currentCurrencyName?.split("/").join("")

    const payload: CurrentCurrencyInfoPayloadType = { time: currencyHistoryTime, currencyPair: formatedCurrency ? formatedCurrency : "EURUSD" }

    try {
        const currencyData = await currencyApi.fetchCurrentCurrencyInfo(payload)
        return currencyData
    }
    catch (e) {
        throw (e)
    }
})

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        updateCurrencyInputValue: (state, action: PayloadAction<string>) => {
            state.currencyInputField = action.payload
        },
        updateCurrentCurrencyName: (state, action: PayloadAction<string>) => {
            state.currentCurrencyName = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
            const sortedCurrencies = action.payload.filter(currency => currency.ticker.includes(state.currencyInputField))
            // We want to make sure that if there are no currencies or search string is empty we want the value to be null not Array(0) so the UI don't break
            const currenciesEmpty = sortedCurrencies.length === 0 || state.currencyInputField.length === 0
            state.allCurrencies = currenciesEmpty ? null : sortedCurrencies
        })
    },
})

// Actions 

export const updateCurrencyInputValue = currencySlice.actions.updateCurrencyInputValue
export const updateCurrentCurrencyName = currencySlice.actions.updateCurrentCurrencyName

export const currencyReducer = currencySlice.reducer

type InitialStateType = {
    currencyInputField: string
    allCurrencies: CurrencyType[] | null
    currentCurrencyInfo: CurrentCurrencyInfoType | null
    currentCurrencyName: string | null
    currencyHistoryTime: string
}

export type CurrencyType = {
    ticker: string;
    bid: string;
    ask: string;
    open: string;
    low: string;
    high: string;
    changes: number;
    date: string;
}

type CurrentCurrencyDataType = {
    index: string | number
    value: string | number
}

type CurrentCurrencyInfoType = {
    labe: string
    data: CurrentCurrencyDataType[]
}