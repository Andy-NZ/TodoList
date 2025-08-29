import styled, { css } from "styled-components"

interface ButtonProps {
    type?: 'Primary' | 'Danger'
}
export const Button = styled.button<ButtonProps>` 
    padding: 5px 10px;
    border: 0.5px solid gray;
    border-radius: 4px;
    ${props => {
        switch (props.type) {
            case 'Primary':
                return `
                        background-color: blue;
                        color: white;
                    `
            case 'Danger':
                return `
                        background-color: red;
                        color: white;
                    `
            default:
                return `
                        color: black;
                    `
        }
    }}
    cursor: pointer;
    :hover{
        border: 1px soid black;
    }

    ${props => props.disabled && css`
        opacity: 0.5;
        cursor: not-allowed;
        background-color: #cccccc;
        color: #666666;
    `}
`

export const ButtonGroup = styled.div`
    display: flex;
    gap: 5px
`
