import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { currencyApi, CurrentCurrencyInfoPayloadType } from "src/main/dal/currencyApi"
import { RootState } from "../store"
import { updateStatus } from "./appReducer"

const initialState: InitialStateType = {
    currencyInputField: "",
    allCurrencies: null,
    currentCurrencyInfo: null,
    currentCurrencyName: null,
    currencyHistoryTime: "15min",
}

export const fetchCurrencies = createAsyncThunk("currency/fetchCurrencies", async (args: void, { dispatch }) => {
    dispatch(updateStatus("loading"))

    try {
        const currencyData: CurrencyType[] = await currencyApi.fetchCurrenciesData()
        dispatch(updateStatus("completed"))
        return currencyData
    }
    catch (e) {
        // TODO change the error reducer
        dispatch(updateStatus("failed"))
        throw (e)
    }
})

export const fetchCurrentCurrencyInfo = createAsyncThunk("currency/fetchCurrentCurrencyInfo", async (temp: string, { getState, dispatch }) => {
    dispatch(updateStatus("loading"))

    const { currencyReducer } = getState() as RootState
    const { currentCurrencyName, currencyHistoryTime } = currencyReducer

    const formatedCurrency = currentCurrencyName?.split("/").join("")

    const payload: CurrentCurrencyInfoPayloadType = { time: currencyHistoryTime, currencyPair: formatedCurrency ? formatedCurrency : "EURUSD" }

    try {
        const currencyData: CurrencyHinstoryResponseType[] = await currencyApi.fetchCurrentCurrencyInfo(payload)
        dispatch(updateStatus("completed"))
        return currencyData
    }
    catch (e) {
        dispatch(updateStatus("failed"))
        throw (e)
    }
})

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        updateCurrencyInputValue: (state, action: PayloadAction<string>) => {
            state.currencyInputField = action.payload.trim()
        },
        updateCurrentCurrencyName: (state, action: PayloadAction<string>) => {
            state.currentCurrencyName = action.payload
        },
        updateCurrencyHistoryTime: (state, action: PayloadAction<string>) => {
            state.currencyHistoryTime = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
            state.currentCurrencyInfo = null
            const sortedCurrencies = action.payload.filter(currency => currency.ticker.includes(state.currencyInputField))
            // We want to make sure that if there are no currencies or search string is empty we want the value to be null not Array(0) so the UI don't break
            const currenciesEmpty = sortedCurrencies.length === 0 || state.currencyInputField.length === 0
            state.allCurrencies = currenciesEmpty ? null : sortedCurrencies
        })
        builder.addCase(fetchCurrentCurrencyInfo.fulfilled, (state, action) => {
            const currencyData = []
            // TODO - Make a func that will dublicate the logic 
            const openCurrencyData: CurrentCurrencyInfoObjectType = {
                name: "Open",
                data: (() => {
                    const res: any[] = []

                    action.payload.map((currency, index) => {
                        res.push(currency.open)
                    })

                    return res
                })()
            }
            currencyData.push(openCurrencyData)

            const closeCurrencyData: CurrentCurrencyInfoObjectType = {
                name: "Close",
                data: (() => {
                    const res: any[] = []

                    action.payload.map((currency, index) => {
                        res.push(currency.close)
                    })

                    return res
                })()

            }
            currencyData.push(closeCurrencyData)

            const highCurrencyData: CurrentCurrencyInfoObjectType = {
                name: "High",
                data: (() => {
                    const res: any[] = []

                    action.payload.map((currency, index) => {
                        res.push(currency.high)
                    })

                    return res
                })()

            }
            currencyData.push(highCurrencyData)

            const lowCurrencyData: CurrentCurrencyInfoObjectType = {
                name: "Low",
                data: (() => {
                    const res: any[] = []

                    action.payload.map((currency, index) => {
                        res.push(currency.low)

                    })

                    return res
                })()

            }
            currencyData.push(lowCurrencyData)

            state.currentCurrencyInfo = currencyData
        })
    },
})

// Actions 

export const updateCurrencyInputValue = currencySlice.actions.updateCurrencyInputValue
export const updateCurrentCurrencyName = currencySlice.actions.updateCurrentCurrencyName
export const updateCurrencyHistoryTime = currencySlice.actions.updateCurrencyHistoryTime

export const currencyReducer = currencySlice.reducer

type InitialStateType = {
    currencyInputField: string
    allCurrencies: CurrencyType[] | null
    currentCurrencyInfo: CurrentCurrencyInfoObjectType[] | null
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

export type CurrentCurrencyDataType = {
    index: string | number
    value: string | number
}

export type CurrentCurrencyLabelTypes = "Open" | "Close" | "High" | "Low"

export type CurrentCurrencyInfoType = {
    label: CurrentCurrencyLabelTypes
    data: CurrentCurrencyDataType[]
}

export type CurrentCurrencyInfoObjectType = {
    name: string,
    data: number[]
}

export type CurrencyHinstoryResponseType = {
    date: string;
    open: number;
    low: number;
    high: number;
    close: number;
    volume: number;
}
