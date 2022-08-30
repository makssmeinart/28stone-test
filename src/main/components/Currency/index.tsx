import React from "react"
import { useDispatch} from "react-redux"
import { CurrencyType, updateCurrentCurrencyName } from "src/main/bll/reducers/currencyReducer"
import { AppDispatch } from "src/main/bll/store"
import styled from "styled-components"

type CurrencyPropsType = {
    currency: CurrencyType
    tableIndex: number
}

export const Currency = React.memo(({ currency, tableIndex }: CurrencyPropsType) => {
    const { ticker, bid, ask } = currency
    const dispatch = useDispatch<AppDispatch>()

    const handleFetchCurrentCurrencyInfo = () => {
        dispatch(updateCurrentCurrencyName(ticker))
    }

    return (
        <Wrapper
            tabIndex={tableIndex}
            onClick={handleFetchCurrentCurrencyInfo}
        >
            <Ticker>{ticker}</Ticker>
            <Holder>
                <Bid>
                    <h2>Bid</h2>
                    <p>{bid}</p>
                </Bid>
                <Ask>
                    <h2>Ask</h2>
                    <p>{ask}</p>
                </Ask>
            </Holder>
        </Wrapper>
    )
})

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1em 1em .5em 0;
    gap: .3em;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    &:hover > p:first-child {
        color: var(--first-color);
    }
    
    &:focus > p:first-child {
         color: var(--accent-color);
    }
`

const Ticker = styled.p`
    font-size: .875rem;
    font-weight: bold;
    color: var(--primary-color);
    transition: color ease .3s ;
`

const Holder = styled.div`
    display: flex;
    width: 200px;
`

const Bid = styled.div`
    width: 50%;
    text-align: left;
    font-size: 1.25rem;

    h2 {
        font-size: .75rem;
        text-transform: uppercase;
    }
`

const Ask = styled.div`
    width: 50%;
    text-align: right;
    font-size: 1.25rem;

    h2 {
        font-size: .75rem;
        text-transform: uppercase;
    }
`