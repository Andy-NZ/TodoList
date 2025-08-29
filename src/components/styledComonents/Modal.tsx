import styled from "styled-components"

export const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Modal = styled.div`
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    width: 500px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
`
export const ModalHeader = styled.div`
    font-size: 1.5rem;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    display: flex;
    justify-content: space-between;
`
export const ModalBody = styled.div`
    padding: 15px 20px;
`
export const ModalFooter = styled.div`
    display: flex;
    justify-content: end;
    padding: 15px 20px;
    border-top: 1px solid rgba(0,0,0,0.3);
`