import { useSelector } from "react-redux"
import { selectAllCurrencies } from "src/main/bll/selectors"
import styled from "styled-components/macro"
import { Currency } from "src/main/components"

export const Currencies = () => {
    const allCurrencies = useSelector(selectAllCurrencies)

    const renderAllCurrencies = () => {
        return allCurrencies?.map((currency, index) => {
            return <Currency key={currency.ticker} currency={currency} tableIndex={index} />
        })
    }

    return <Wrapper> {allCurrencies && renderAllCurrencies()} </Wrapper>
}

const Wrapper = styled.div`
    height: 100%;
    margin-top: 1rem;
    overflow-y: auto;

    ::-webkit-scrollbar {
    width: 10px;
    }

    ::-webkit-scrollbar-track {
    background-color: var(--second-color);
    }

    ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 1);
    background-color: var(--accent-color);
    }
`