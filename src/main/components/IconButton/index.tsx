import styled from "styled-components"
import arrowLeft from "src/assets/images/icons/arrowLeft.png"

export const IconButton = ({ onClick }: IconButtonPropsType) => {

    return (
        <Wrapper>
            <Button data-testid="icon-button" onClick={onClick} >
                <img src={arrowLeft} alt="Search query" />
            </Button>
        </Wrapper>
    )
}

type IconButtonPropsType = {
    onClick: () => void
}

const Wrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    
`

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 25px;
    width: 25px;
    background-color: var(--fourth-color);
    border-radius: 50%;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
        -webkit-transform: translateZ(0) scale(1.0, 1.0);
        transform: translateZ(0);

    img {
        max-width: 100%;
    }
`