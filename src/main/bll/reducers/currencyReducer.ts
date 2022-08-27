import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { currencyApi } from "src/main/dal/currencyApi"

const initialState: InitialStateType = {
    currencyInputField: "",
    allCurrencies: null,
    currentCurrency: null,
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

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        updateCurrencyInputValue: (state, action: PayloadAction<string>) => {
            state.currencyInputField = action.payload
        },
        updateCurrentCurrency: (state, action: PayloadAction<CurrencyType>) => {
            state.currentCurrency = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
            const sortedCurrencies = action.payload.filter(currency => currency.ticker.includes(state.currencyInputField))
            // We want to make sure that if there are no currencies or search string is empty we want the value to be null not Array(0) so the UI don't break
            const currenciesEmpty = sortedCurrencies.length === 0 || state.currencyInputField.length === 0
            state.allCurrencies = currenciesEmpty ? null : sortedCurrencies
            // If we search for new query we want to reset currentCurrency to null
            state.currentCurrency = null
        })
    },
})

// Actions 

export const updateCurrencyInputValue = currencySlice.actions.updateCurrencyInputValue
export const updateCurrentCurrency = currencySlice.actions.updateCurrentCurrency

export const currencyReducer = currencySlice.reducer

type InitialStateType = {
    currencyInputField: string
    allCurrencies: CurrencyType[] | null
    currentCurrency: CurrencyType | null
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