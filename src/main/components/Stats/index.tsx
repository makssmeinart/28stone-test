import { CurrencyType } from "src/main/bll/reducers/currencyReducer"
import styled from "styled-components"

type StatsPropsType = {
    currency: CurrencyType
}

export const Stats = ({ currency }: StatsPropsType) => {
    const { ask, bid, changes, date, high, low, open, ticker } = currency

    return (
        <Wrapper>
            <h1>{ticker}</h1>
            <div>{ask}</div>
            <div>{bid}</div>
            <div>{changes}</div>
            <div>{date}</div>
            <div>{high}</div>
            <div>{low}</div>
            <div>{open}</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    min-width: 500px;
`