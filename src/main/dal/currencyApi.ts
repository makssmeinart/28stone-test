import { instance } from "./config"

export const currencyApi = {
    fetchCurrenciesData: async () => {
        const resp = await instance.get("/fx")
        return resp.data
    }
}