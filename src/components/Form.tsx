import styled from "styled-components"

type TextProps = {
    disabled?: boolean
}
export const Text = styled.span<TextProps>`
    text-decoration-line: ${props => props.disabled ? "line-through" : "none"};
    color: ${props => props.disabled ? "gray" : "black"};
`

export const Input = styled.input`
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;

    &:focus {
        outline: none;
        border-color: gray;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    &::placeholder {
        color: #999;
    }
`

export const TextArea = styled.textarea`
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;

    &:focus {
        outline: none;
        border-color: gray;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    &::placeholder {
        color: #999;
    }
`

export const ErrorMessage = styled.div`
    color: red;
` 