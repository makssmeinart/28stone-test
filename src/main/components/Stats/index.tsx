import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrencyHistoryData, selectCurrentCurrencyName } from "src/main/bll/selectors";
import { AppDispatch } from "src/main/bll/store";
import { updateCurrencyHistoryTime } from "src/main/bll/reducers/currencyReducer";
import styled from "styled-components";

export const Stats = () => {
    const dispatch = useDispatch<AppDispatch>()
    const currentCurrencyName = useSelector(selectCurrentCurrencyName)
    const currencyHistoryData = useSelector(selectCurrencyHistoryData)

    const historyDataNotEmpty = currencyHistoryData && currencyHistoryData.map(section => section.data).reduce((acc, nextVal) => acc + nextVal.length, 0) > 1
    const handleUpdateHistoryTime = (time: string) => {
        dispatch(updateCurrencyHistoryTime(time))
    }

    const options: ApexOptions = {
        chart: {
            width: '100%',
            height: 550,
            type: 'line',

            zoom: {
                enabled: true,
            },
        },
    };

    const series = currencyHistoryData!

    return (
        <>
            {
                historyDataNotEmpty ?
                    <GrapthWrapper>
                        <div>
                            <Title>{currentCurrencyName}</Title>
                            <Subtitle>latest currency exchange prices per days</Subtitle>
                        </div>
                        < ReactApexChart
                            options={options}
                            series={series}
                            type="line"
                            height={350}
                            width={500}
                        />

                        <ButtonsWrapper>
                            <Button data-testid="chart-buttons" onClick={() => handleUpdateHistoryTime("1min")}>1 Min</Button>
                            <Button onClick={() => handleUpdateHistoryTime("5min")}>5 Min</Button>
                            <Button onClick={() => handleUpdateHistoryTime("15min")}>15 Min</Button>
                            <Button onClick={() => handleUpdateHistoryTime("30min")}>30 Min</Button>
                        </ButtonsWrapper>
                    </GrapthWrapper>
                    :
                    <NoData>
                        <p>
                            Sorry no data was found on  this currency pair...
                        </p>
                    </NoData>
            }
        </>
    )
}

const GrapthWrapper = styled.div`
    max-width: 100%;
    overflow-x: scroll;
`

export const ButtonsWrapper = styled.div`
    margin: 1rem 0 .6rem .85rem;
    display: flex;
    gap: 1rem;
`

const Button = styled.div`
    padding: .2em .5em;
    border-radius: 5px;
    background-color: var(--first-color);
    color: var(--fourth-color);
    font-size: .9rem;
    cursor: pointer;
    transition: all ease .3s;

    &:hover {
        background-color: var(--second-color);
    }
`

const Title = styled.h2`
    font-size: 2.3rem;
`
const Subtitle = styled.p`
    font-size: 1.3rem;
`
const NoData = styled.div`
    margin-top: 1rem;

    p {
        color: red;
    }
`