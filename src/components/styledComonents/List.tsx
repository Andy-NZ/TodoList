import styled from "styled-components"

export const List = styled.ul`
    list-style: none; 
    padding: 0px;
`
interface ListItemProps {
    disabled?: boolean
}
export const ListItem = styled.li<ListItemProps>`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid gray;
    border-radius: 5px;  
    transition: box-shadow 0.3s ease-in-out; 
    box-shadow: none;
    background: ${props => props.disabled ? "rgba(0, 0, 0, 0.1)" : "none"};

    &:hover{
        box-shadow: ${props => props.disabled ? "none" : "5px 5px 5px rgba(0, 0, 0, 0.5)"};
    }
` 