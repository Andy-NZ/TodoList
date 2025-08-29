import { screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import type { Todo } from "../core/types"
import { TodoItem } from "./TodoItem"
import { renderWithProviders } from "../utils/test-utils"
import * as todoSlice from "../slices/todosSlice";

describe('TodoItem', () => {
    const todo: Todo = { id: 1, todo: 'Todo task A', completed: false }
    const onEditClick = vi.fn()
    const onDeleteClick = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders todo text', () => {
        renderWithProviders(<TodoItem {...{ todo, onEditClick, onDeleteClick }} />)
        expect(screen.getByText('Todo task A')).toBeInTheDocument()
    })

    it('should dispatch updateTodo on click "Complete" button', async () => {
        const updateTodoSpy = vi.spyOn(todoSlice, 'updateTodo')
        renderWithProviders(<TodoItem {...{ todo, onEditClick, onDeleteClick }} />)

        const completeBtn = screen.getByRole("button", { name: "Complete" })
        await userEvent.click(completeBtn)

        expect(updateTodoSpy).toHaveBeenCalledWith({ ...todo, completed: true })
    })

    it('should trigger onEditClick when click "Edit" button', async () => {
        renderWithProviders(<TodoItem {...{ todo, onEditClick, onDeleteClick }} />)

        const completeBtn = screen.getByRole("button", { name: "Edit" })
        await userEvent.click(completeBtn)

        expect(onEditClick).toBeCalled()
    })

    it('should tigger onDeleteClick when click "Delete" button', async () => {
        renderWithProviders(<TodoItem {...{ todo, onEditClick, onDeleteClick }} />)

        const completeBtn = screen.getByRole("button", { name: "Delete" })
        await userEvent.click(completeBtn)


        expect(onDeleteClick).toBeCalled()
    })

    it('should disable "Complete" and "Edit" buttons', () => {
        renderWithProviders(<TodoItem todo={{ ...todo, completed: true }} {...{ onEditClick, onDeleteClick }} />)

        const completedBtn = screen.getByRole("button", { name: "Completed" })
        const editBtn = screen.getByRole("button", { name: "Edit" })

        expect(completedBtn).toBeDisabled()
        expect(editBtn).toBeDisabled()
    })
})