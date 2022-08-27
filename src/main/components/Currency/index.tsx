import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CurrencyType, fetchCurrentCurrencyInfo, updateCurrentCurrencyName } from "src/main/bll/reducers/currencyReducer"
import { selectCurrentCurrencyName } from "src/main/bll/selectors/selectCurrentCurrencyName"
import { AppDispatch } from "src/main/bll/store"
import styled from "styled-components"

type CurrencyPropsType = {
    currency: CurrencyType
    tableIndex: number
}

export const Currency = React.memo(({ currency, tableIndex }: CurrencyPropsType) => {
    const { date, ticker } = currency
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
            <div>
                <div>BID</div>
                <div>LOW</div>
            </div>
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
    
    &:focus {
        border-bottom: 2px solid var(--second-color);
    }
`

const Ticker = styled.p`
    font-size: .9rem;
    font-weight: bold;
    color: var(--primary-color);
`

const Date = styled.p`
    font-size: .8rem;
    color: var(--primary-color);
`