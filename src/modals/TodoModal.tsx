import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks"
import type { Todo } from "../core/types"
import { addTodo, updateTodo } from "../slices/todosSlice"
import { Modal, ModalBackdrop, Button, ButtonGroup, ModalBody, ModalFooter, ModalHeader, TextArea, ErrorMessage } from "../components";

type Props = {
    showModal: boolean
    editingTodo?: Todo
    onClose: () => void
}

export const TodoModal = ({ showModal, editingTodo, onClose }: Props) => {
    const dispatch = useAppDispatch()
    const [todo, setTodo] = useState(editingTodo?.todo ?? '')
    const [error, setError] = useState<string | undefined>('')

    useEffect(() => {
        if (editingTodo) {
            setTodo(editingTodo.todo)
        }
    }, [editingTodo])

    if (!showModal) return null;

    const validate = (value: string) => {
        let message

        if (!value.trim()) {
            message = 'Todo is requried. Please enter a value.'
        }

        if (value.length > 250) {
            message = 'Maximum allowed characters is 250. Please shorten your input.'
        }

        setError(message)

        return !message
    }

    const handleSubmit = () => {
        if (validate(todo)) {
            if (editingTodo) {
                dispatch(updateTodo({ ...editingTodo, todo }))
            } else {
                dispatch(addTodo({ todo, completed: false }))
            }

            setTodo("")
            onClose()
        }
    }

    const handleClose = () => {
        setTodo("")
        setError("")
        onClose()
    }

    return (
        <ModalBackdrop>
            <Modal role='dialog'>
                <ModalHeader>
                    {editingTodo ? 'Edit Todo' : 'Add Todo'}
                </ModalHeader>
                <ModalBody>
                    <TextArea id="todo" value={todo} onChange={(e) => { setTodo(e.target.value) }} placeholder="Write your todo..." rows={4} />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={() => { handleClose()}}>Close</Button>
                        <Button type="Primary" onClick={() => { handleSubmit() }}>{editingTodo ? "Save" : "Add"}</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Modal>
        </ModalBackdrop>
    )
}