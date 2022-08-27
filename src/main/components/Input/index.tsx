import styled from "styled-components"
import { IconButton } from "src/main/components"

type InputPropsValueType = {
    value: string
    placeholder: string
    onChange: (e: any) => void
    onButtonClick: () => void
}

export const Input = ({value,placeholder,onChange,onButtonClick,}: InputPropsValueType) => {

    return (
        <Wrapper>
            <InputField
                onChange={onChange}
                placeholder={placeholder}
                value={value}
            />
            <IconButton onClick={onButtonClick} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
`

const InputField = styled.input`
    height: 40px;
    width: 100%;
    border: 1px solid var(--first-color);
    padding: 2px 35px 2px 5px;
    outline: none;
    font-weight: 600;
    color: var(--first-color);

    &:focus {
        box-shadow: 0px 0px 2px var(--first-color);
    }

    &::placeholder {
        color: var(--second-color);
        letter-spacing: 1px;
    }
`