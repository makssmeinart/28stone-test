import { useSelector } from "react-redux"
import { selectAllCurrencies } from "src/main/bll/selectors"
import styled from "styled-components/macro"
import { Currency } from "src/main/components"

export const Currencies = () => {
    const allCurrencies = useSelector(selectAllCurrencies)

    const renderAllCurrencies = () => {
        return allCurrencies?.map((currency, index) => {
            return <Currency key={currency.ticker} currency={currency} tableIndex={index}/>
        })
    }

    return <Wrapper> {allCurrencies && renderAllCurrencies()} </Wrapper>
}

const Wrapper = styled.div`
    margin-top: 1rem;
    overflow-y: auto;
`