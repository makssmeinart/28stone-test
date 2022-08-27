import styled from "styled-components"

export const IconButton = ({ onClick }: IconButtonPropsType) => {

    return (
        <Wrapper>
            <Button onClick={onClick} />
        </Wrapper>
    )
}

type IconButtonPropsType = {
    onClick: () => void
}

const Wrapper = styled.div`
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
`

const Button = styled.div`
    cursor: pointer;
    height: 25px;
    width: 25px;
    background-color: black;
    border-radius: 50%;
`