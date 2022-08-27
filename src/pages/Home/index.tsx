import { Holder } from "src/main/components"
import styled from "styled-components/macro"

export const Home = () => {

    return (
        <Wrapper>
            <Holder />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
