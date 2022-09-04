import {DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react"
import styled from "styled-components"
import { IconButton } from "src/main/components"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

type InputPropsValueType = DefaultInputPropsType & {
    value: string
    placeholder: string
    onChange: (e: any) => void
    onButtonClick: () => void
    onEnter?: () => void
}

export const Input = ({ value, placeholder, onChange, onButtonClick, onKeyPress, onEnter }: InputPropsValueType) => {

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === "Enter" && onEnter();
    };

    return (
        <Wrapper>
            <InputField
                autoFocus={true}
                data-testid="search-input"
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                onKeyPress={onKeyPressCallback}
                
            />
            <IconButton onClick={onButtonClick} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
`

const InputField = styled.input`
    height: 50px;
    width: 100%;
    border: 2px solid var(--first-color);
    padding: 2px 50px 2px 5px;
    outline: none;
    font-weight: 600;
    font-size: 1rem;
    color: var(--fourth-color);
    border: 2px solid transparent;
    background-color: var(--first-color);

    &:focus {
        border: 2px solid var(--second-color);
       }

    &:focus-within + div div {
        animation: 1.7s linear .1s wobble-animation infinite;
    }

    &::placeholder {
        color: var(--fourth-color);
        letter-spacing: 1px;
    }

    @keyframes wobble-animation {
    0% { transform: translateX(0px)}
    25% { transform: translateX(2.5px)}
    50% { transform: translateX(5px)}
    75% { transform: translateX(2.5px)}
    100% { transform: translateX(0px)}
}
`

