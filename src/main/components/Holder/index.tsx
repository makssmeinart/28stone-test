import styled from "styled-components/macro"
import { Input, Currencies, Stats } from "src/main/components"
import { ChangeEvent} from "react"
import { useDispatch, useSelector } from "react-redux"
import {selectAllCurrencies, selectCurrencyInput } from "src/main/bll/selectors"
import { AppDispatch } from "src/main/bll/store"
import { fetchCurrencies, updateCurrencyInputValue } from "src/main/bll/reducers/currencyReducer"
import { selectCurrentCurrency } from "src/main/bll/selectors/selectCurrentCurrency"

export const Holder = () => {
    const currencyInputValue = useSelector(selectCurrencyInput)
    const allCurrencies = useSelector(selectAllCurrencies)
    const currentCurrency = useSelector(selectCurrentCurrency)

    const dispatch = useDispatch<AppDispatch>()

    const handleUpdateCurrencyInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.toUpperCase()
        dispatch(updateCurrencyInputValue(value))
    }

    const fetchAllCurrecyData = () => {
        dispatch(fetchCurrencies())
    }

    return (
        <Wrapper>
            <Inner>
                {/* We can incapsulate all the value, placeholder... Inside of the Input component but we wont be able to re-use it if we will need to. */}
                <Input
                    value={currencyInputValue}
                    placeholder={"EUR/USD"}
                    onChange={handleUpdateCurrencyInputValue}
                    onButtonClick={fetchAllCurrecyData}
                />
                {allCurrencies && <Currencies />}
            </Inner>
            {currentCurrency && <Stats currency={currentCurrency}/>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    max-height: 700px;
    display: flex;
    gap: 1rem;
    margin: 0 1.5em;
    padding: 1.5rem 2rem;
    background-color: var(--fourth-color);
    border-radius: 1rem;
    overflow: hidden;

    @media (max-height: 1000px) {
        max-height: 500px;
      }
`

const Inner = styled.div`
    overflow-y: hidden;
`

const Content = styled.div``