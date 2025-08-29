import styled from "styled-components"

interface FlexProps {
    justifyContent?: "Space-Between" | 'End'
    alignItems?: "Center"
}
export const Flex = styled.div<FlexProps>`
    display: flex;
    justify-content: ${props => props.justifyContent ?? "Space-Between"};
    align-items:  ${props => props.alignItems ?? "Center"};
`
