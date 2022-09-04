import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { currencyApi, CurrentCurrencyInfoPayloadType } from "src/main/dal/currencyApi"
import { handleErrors } from "src/main/utils"
import { HandleErorrsPropsType } from "src/main/utils/handleErrors"
import { RootState } from "../store"
import { updateErrorMessage, updateStatus } from "./appReducer"

const initialState: InitialStateType = {
    currencyInputField: "",
    allCurrencies: null,
    currentCurrencyInfo: null,
    currentCurrencyName: null,
    currencyHistoryTime: "15min",
}

export const fetchCurrencies = createAsyncThunk("currency/fetchCurrencies", async (args: void, { dispatch, getState }) => {
    dispatch(updateStatus("loading"))

    try {
        const rootState = getState() as RootState
        const currencyInputField = rootState.currencyReducer.currencyInputField

        const currencyData: CurrencyType[] = await currencyApi.fetchCurrenciesData()

        // I need to filter this data here because in case the search returns empty array or we search for empty srting
        // I want to update the appRedcuer/errorMessage value...
        const sortedCurrencies = currencyData.filter(currency => currency.ticker.includes(currencyInputField))
        if (sortedCurrencies.length === 0) {
            dispatch(updateErrorMessage("The requested currency pairs were not found..."))
        }
        if (currencyInputField.length === 0) {
            dispatch(updateErrorMessage("Please enter currency/currency pair"))
        }
        dispatch(updateStatus("completed"))

        return sortedCurrencies
    }
    catch (e) {
        return handleErrors({ e, dispatch })
    }
})

export const fetchCurrentCurrencyInfo = createAsyncThunk("currency/fetchCurrentCurrencyInfo", async (args: void, { getState, dispatch }) => {
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
        return handleErrors({ e, dispatch })
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
            const sortedCurrencies = action.payload
            state.currentCurrencyInfo = null
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
                    const res: number[] = []

                    action.payload.map((currency) => {
                        res.push(currency.open)
                    })

                    return res
                })()
            }
            currencyData.push(openCurrencyData)

            const closeCurrencyData: CurrentCurrencyInfoObjectType = {
                name: "Close",
                data: (() => {
                    const res: number[] = []

                    action.payload.map((currency) => {
                        res.push(currency.close)
                    })

                    return res
                })()

            }
            currencyData.push(closeCurrencyData)

            const highCurrencyData: CurrentCurrencyInfoObjectType = {
                name: "High",
                data: (() => {
                    const res: number[] = []

                    action.payload.map((currency) => {
                        res.push(currency.high)
                    })

                    return res
                })()

            }
            currencyData.push(highCurrencyData)

            const lowCurrencyData: CurrentCurrencyInfoObjectType = {
                name: "Low",
                data: (() => {
                    const res: number[] = []

                    action.payload.map((currency) => {
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
