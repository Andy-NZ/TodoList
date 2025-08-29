import { useAppDispatch } from "../app/hooks"
import { updateTodo } from "../slices/todosSlice"
import type { Todo } from "../core/types"
import { Button, ButtonGroup, Flex, Text } from "./styledComonents"

type Props = {
    todo: Todo
    onEditClick: (todo: Todo) => void
    onDeleteClick: (todo: Todo) => void
}

export const TodoItem = ({ todo, onEditClick, onDeleteClick }: Props) => {
    const dispatch = useAppDispatch()

    const handleComplete = () => {
        dispatch(updateTodo({ ...todo, completed: true }))
    }

    return (
        <Flex>
            <Text disabled={todo.completed}>{todo.todo}</Text>

            <ButtonGroup>
                <Button onClick={() => { handleComplete() }} disabled={todo.completed}>{todo.completed ? "Completed" : "Complete"}</Button>
                <Button onClick={() => { onEditClick(todo) }} disabled={todo.completed}>Edit</Button>
                <Button type="Danger" onClick={() => { onDeleteClick(todo) }} disabled={todo.completed}>Delete</Button>
            </ButtonGroup>
        </Flex>
    )
}