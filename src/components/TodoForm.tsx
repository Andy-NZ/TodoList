import styled from "styled-components"
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks"
import { Todo } from "../core/types"
import { addTodo, updateTodo } from "../slices/todosSlice"
import { Button, ButtonGroup, Input } from "./styledComonents";

const StyledTodoForm = styled.div` 
    display: flex;
    gap: 10px;

    input {
        width: 80%;
    }
`

interface Props {
    editingTodo?: Todo
    onCancelEdit: () => void
}

export const TodoForm = ({ editingTodo, onCancelEdit }: Props) => {
    const dispatch = useAppDispatch()
    const [todo, setTodo] = useState(editingTodo?.todo ?? "")

    useEffect(() => {
        setTodo(editingTodo?.todo ?? "")
    }, [editingTodo])

    const handleSubmit = () => {
        if (editingTodo) {
            dispatch(updateTodo({ ...editingTodo, todo }))
        } else {
            dispatch(addTodo({ todo, completed: false }))
        }

        setTodo("")
    }

    const handleCancel = () => {
        if (editingTodo) {
            onCancelEdit()
        }
        setTodo("")
    }

    return (
        <StyledTodoForm>
            <Input id="todo" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Todo" />
            <ButtonGroup>
                <Button disabled={!todo} onClick={() => handleSubmit()}>{editingTodo ? "Update" : "Add"}</Button>
                {todo && <Button onClick={() => handleCancel()}>Cancel</Button>}
            </ButtonGroup>
        </StyledTodoForm>
    )
}