import { fireEvent, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { Todo } from "../core/types"
import { renderWithProviders } from "../utils/test-utils"
import * as todoSlice from "../slices/todosSlice";
import { TodoForm } from "./TodoForm";

describe('TodoForm', () => {
    const mockTodo: Todo = { id: 1, todo: 'Todo task A', completed: false }
    const onCancelEdit = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render input and "Add" button', () => {
        renderWithProviders(<TodoForm onCancelEdit={onCancelEdit} />)

        const input = screen.getByRole('textbox')
        const addButton = screen.getByRole('button', { name: 'Add' })

        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('placeholder', 'Todo')
        expect(addButton).toBeInTheDocument()
    })

    describe('Add Todo', () => {
        it('should disable when input value is empty', () => {
            renderWithProviders(<TodoForm onCancelEdit={onCancelEdit} />)

            const addButton = screen.getByRole('button', { name: 'Add' })

            expect(addButton).toBeDisabled()
        })

        it('should enable "Add" button when udpate input', async () => {
            renderWithProviders(<TodoForm onCancelEdit={onCancelEdit} />)

            const input = screen.getByRole('textbox')
            const addButton = screen.getByRole('button', { name: 'Add' })

            await userEvent.type(input, "Test Todo")

            expect(addButton).not.toBeDisabled()
        })

        it('should dispatch addTodo when click "Add" button', async () => {
            const addTodoSpy = vi.spyOn(todoSlice, 'addTodo')
            renderWithProviders(<TodoForm onCancelEdit={onCancelEdit} />)

            const input = screen.getByRole('textbox')
            const addButton = screen.getByRole('button', { name: 'Add' })

            await userEvent.type(input, "Test Todo")
            await userEvent.click(addButton)

            expect(addTodoSpy).toBeCalledWith({ todo: 'Test Todo', completed: false })
        })
    })

    describe('Update Todo', () => {
        it('should display default value and buttons when editing', () => {
            renderWithProviders(<TodoForm editingTodo={mockTodo} onCancelEdit={onCancelEdit} />)

            const input = screen.getByRole('textbox')
            const updateButton = screen.getByRole('button', { name: 'Update' })
            const cancelButton = screen.getByRole('button', { name: 'Cancel' })

            expect(input).toHaveValue('Todo task A')
            expect(updateButton).toBeInTheDocument()
            expect(cancelButton).toBeInTheDocument()
        })

        it('should dispatch updateTodo when click "Updaate" button', async () => {
            const updateTodoSpy = vi.spyOn(todoSlice, 'updateTodo')
            renderWithProviders(<TodoForm editingTodo={mockTodo} onCancelEdit={onCancelEdit} />)

            const input = screen.getByRole('textbox')
            const updateButton = screen.getByRole('button', { name: 'Update' })

            fireEvent.change(input, { target: { value: "new task" } })
            await userEvent.click(updateButton)

            expect(updateTodoSpy).toBeCalledWith({ ...mockTodo, todo: 'new task' })
        })

        it('should not dispatch updateTodo and reset input when click "Cancel" button', async () => {
            const updateTodoSpy = vi.spyOn(todoSlice, 'updateTodo')
            renderWithProviders(<TodoForm editingTodo={mockTodo} onCancelEdit={onCancelEdit} />)

            const input = screen.getByRole('textbox')
            const cancelButton = screen.getByRole('button', { name: 'Cancel' })

            await userEvent.type(input, 'new task')
            await userEvent.click(cancelButton)

            expect(updateTodoSpy).not.toBeCalled()
            expect(input).toHaveValue('')
        })
    })
})