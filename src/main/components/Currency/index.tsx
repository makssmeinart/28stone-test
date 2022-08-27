import { useDispatch } from "react-redux"
import { CurrencyType, updateCurrentCurrency } from "src/main/bll/reducers/currencyReducer"
import { AppDispatch } from "src/main/bll/store"
import styled from "styled-components"

type CurrencyPropsType = {
    currency: CurrencyType
    tableIndex: number
}

export const Currency = ({ currency, tableIndex }: CurrencyPropsType) => {
    const dispatch = useDispatch<AppDispatch>()

    const { date, ticker } = currency

    const formattedDate = () => {
        return date.split(" ")[0]
    }

    const changeCurrentCurrencie = () => {
        dispatch(updateCurrentCurrency(currency))
    }

    return (
        <Wrapper
            tabIndex={tableIndex}
            onClick={changeCurrentCurrencie}
        >
            <Ticker>{ticker}</Ticker>
            <Date>Date: <span>{formattedDate()}</span></Date>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
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
    font-size: 1rem;
    font-weight: bold;
    color: var(--primary-color);
`

const Date = styled.p`
    font-size: .8rem;
    color: var(--primary-color);
`