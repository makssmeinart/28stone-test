import React from "react"
// @ts-ignore
import { Chart } from 'react-charts'
import { CurrencyType } from "src/main/bll/reducers/currencyReducer"
import styled from "styled-components"

export const Stats = () => {

    const data = React.useMemo(
        () => [
            {
                label: 'Open',
                data: "10000",
              },
              {
                label: 'High',
                data: "1231",
              },
              {
                label: 'Low',
                data: "831",
              },
              {
                label: 'Close',
                data: "3112",
              },
        ],
        []
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    const lineChart = (
        // A react-chart hyper-responsively and continuously fills the available
        // space of its parent element automatically
        <div
            style={{
                width: '400px',
                height: '300px'
            }}
        >
            <Chart data={data} axes={axes} />
        </div>
    )

    return (
        <Wrapper>
            <div
                style={{
                    width: '400px',
                    height: '300px'
                }}
            >
                <Chart data={data} axes={axes} />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    min-width: 500px;
`