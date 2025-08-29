import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchInitialTodos, } from '../../slices/todosSlice'
import { TodoItem } from './TodoItem'
import { Button, Flex, List, ListItem } from '../../components'
import { localStorageService } from '../../core/localStorageService'
import { TodoModal } from '../../modals/TodoModal'
import { ConfirmModal } from '../../modals/ConfirmModal'
import { useTodoList } from './useTodoList'

export function TodoListPage() {
    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todos)
    const { showTodoModal, showDeleteModal, editingTodo, setDeleteModal, handleAdd, handleClose, handleDelete, handleEdit, handleConfirmDelete } = useTodoList()

    useEffect(() => {
        if (localStorageService.isTodosUndeinfed()) {
            void dispatch(fetchInitialTodos())
        }
    }, [dispatch])

    return (
        <div style={{ padding: "1rem" }}>
            <Flex>
                <h1>Todo List</h1>
                <Button onClick={() => { handleAdd() }}>+ Add New Todo</Button>
            </Flex>

            <hr />

            <List>
                {todos.map(todo =>
                    <ListItem key={todo.id} disabled={todo.completed}>
                        <TodoItem todo={todo} onEditClick={(todo) => { handleEdit(todo) }} onDeleteClick={(todo) => { handleDelete(todo) }} />
                    </ListItem>
                )}
            </List>

            <ConfirmModal showModal={showDeleteModal} onCancel={() => { setDeleteModal(false) }} onConfirm={handleConfirmDelete} />
            <TodoModal showModal={showTodoModal} editingTodo={editingTodo} onClose={() => { handleClose() }} />
        </div >
    )
}
