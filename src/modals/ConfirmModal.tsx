import { Modal, ModalBackdrop, Button, ButtonGroup, ModalHeader, ModalBody, ModalFooter } from "../components/styledComonents"

type Props = {
    showModal: boolean
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmModal = ({ showModal, onConfirm, onCancel }: Props) => {
    if (!showModal) return null

    return (
        <ModalBackdrop>
            <Modal role="dialog">
                <ModalHeader>Confirm</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete it?
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={() => { onCancel() }}>Cancel</Button>
                        <Button type="Danger" onClick={() => { onConfirm() }}>Delete</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Modal>
        </ModalBackdrop>
    )
}