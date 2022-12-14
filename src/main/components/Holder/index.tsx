import styled from "styled-components/macro"
import { Input, Currencies, Stats, Loader, ErrorSnackbar } from "src/main/components"
import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllCurrencies, selectCurrencyHistoryData, selectCurrencyInput, selectHistoryTime, selectStatus } from "src/main/bll/selectors"
import { AppDispatch } from "src/main/bll/store"
import { fetchCurrencies, fetchCurrentCurrencyInfo, updateCurrencyInputValue } from "src/main/bll/reducers/currencyReducer"
import { selectCurrentCurrencyName } from "src/main/bll/selectors/selectCurrentCurrencyName"

export const Holder = () => {
    const dispatch = useDispatch<AppDispatch>()

    const [didRender, setDidRender] = useState(false)
    const currencyHistoryData = useSelector(selectCurrencyHistoryData)
    const currencyInputValue = useSelector(selectCurrencyInput)
    const allCurrencies = useSelector(selectAllCurrencies)
    const currentCurrencyName = useSelector(selectCurrentCurrencyName)
    const currentHistoryTime = useSelector(selectHistoryTime)
    const loadingStatus = useSelector(selectStatus)

    const handleUpdateCurrencyInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.toUpperCase()
        dispatch(updateCurrencyInputValue(value))
    }

    const fetchAllCurrecyData = () => {
        dispatch(fetchCurrencies())
    }

    useEffect(() => {
        setDidRender(true);
    }, []);

    useEffect(() => {
        if (didRender) {
            dispatch(fetchCurrentCurrencyInfo())
        }
    }, [currentCurrencyName])

    useEffect(() => {
        if (didRender) {
            dispatch(fetchCurrentCurrencyInfo())
        }
    }, [currentHistoryTime])

    if (loadingStatus === "loading") {
        return <Loader />
    }

    return (
        <Wrapper gap={currencyHistoryData && "1rem"}>
            <Inner>
                {/* We can incapsulate all the value, placeholder... Inside of the Input component but we wont be able to re-use it if we will need to. */}
                <Input
                    value={currencyInputValue}
                    placeholder={"Search currency value"}
                    onChange={handleUpdateCurrencyInputValue}
                    onButtonClick={fetchAllCurrecyData}
                    // You can just press enter when entered the data in the input instead of clicking the button
                    onEnter={fetchAllCurrecyData}
                />
                {allCurrencies && <Currencies data-testid="currencies" />}
            </Inner>
            <div>
                {currencyHistoryData && <Stats />}
            </div>
            <ErrorSnackbar />
        </Wrapper>
    )
}

const Wrapper: any = styled.div<{ gap: string }>`
    max-height: 700px;
    min-width: 320px;
    display: flex;
    gap: ${props => (props.gap ? props.gap : "0")};;
    margin: 0 1.5em;
    padding: 1.2rem 2rem;
    background-color: var(--fourth-color);
    border-radius: 1rem;
    overflow: hidden;

    @media (max-width: 900px) {
        flex-direction: column;
        gap: 0;
        max-width: 320px;
        max-height: 590px !important;
        padding: 1em;
    }

    @media (max-height: 1000px) {
        max-height: 500px;
      }
`

const Inner = styled.div`
    overflow-y: hidden;
    width: 100%;
`

const Content = styled.div``