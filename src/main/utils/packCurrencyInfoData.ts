import { CurrencyType, CurrentCurrencyDataType, CurrentCurrencyLabelTypes } from "../bll/reducers/currencyReducer"

export const getCurrencyData = ({ label, data, word}: CurrencyDataPropsType) => {
    return {
        label,
        data: (() => {
            const res: CurrentCurrencyDataType[] = []

            data.map((currency, index) => {
                // res.push({ index, value: currency[`${word}`] })
            })

            return res
        })()
    }
}

type CurrencyDataPropsType = {
    label: CurrentCurrencyLabelTypes
    data: CurrencyType[]
    word: string
}
