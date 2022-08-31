import { instance } from "./config"

export const currencyApi = {
    fetchCurrenciesData: async () => {
        const resp = await instance.get("/fx")
        return resp.data
    },
    fetchCurrentCurrencyInfo: async ({ time, currencyPair }: CurrentCurrencyInfoPayloadType) => {
        const resp = await instance.get(`/historical-chart/${time}/${currencyPair}?limit=25`)
        return resp.data
    }
}

export type CurrentCurrencyInfoPayloadType = {
    time: string
    currencyPair: string
}