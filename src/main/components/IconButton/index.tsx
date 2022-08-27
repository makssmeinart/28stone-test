import styled from "styled-components"

const Wrapper = styled.div`
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
`

const Button = styled.button`
    cursor: pointer;
    height: 25px;
    width: 25px;
    background-color: red;
`

export const IconButton = ({onClick}: IconButtonPropsType) => {

    return (
        <Wrapper>
            <Button onClick={onClick}/>
        </Wrapper>
    )
}

type IconButtonPropsType = {
    onClick: () => void
}