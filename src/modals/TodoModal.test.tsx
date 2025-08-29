import { screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { TodoModal } from "./TodoModal";
import { renderWithProviders } from "../utils/test-utils";
import { Todo } from "../core/types";
import * as todoSlice from "../slices/todosSlice";

describe('TodoModal', () => {
    const onConfirm = vi.fn()
    const onClose = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('From validation', () => {
        it('should show rquired validation error when value is empty and submit form', async () => {
            renderWithProviders(<TodoModal showModal={true} {...{ onConfirm, onClose }} />)

            await userEvent.click(screen.getByRole('button', { name: 'Add' }))

            expect(screen.getByRole('textbox')).toHaveValue("")
            expect(screen.getByText('Todo is requried. Please enter a value.')).toBeInTheDocument()
        })

        it('should show max lenght error when over 250 characters', async () => {
            renderWithProviders(<TodoModal showModal={true} {...{ onConfirm, onClose }} />)

            await userEvent.type(screen.getByRole('textbox'), 'a'.repeat(251))
            await userEvent.click(screen.getByRole('button', { name: 'Add' }))

            expect(screen.getByText('Maximum allowed characters is 250. Please shorten your input.')).toBeInTheDocument()
        })
    })

    describe('Add Todo', () => {
        it('should render Add Todo modal when showModal is true and no editingTodo', () => {
            renderWithProviders(<TodoModal showModal={true} {...{ onConfirm, onClose }} />)

            expect(screen.getByText('Add Todo')).toBeInTheDocument()
            expect(screen.getByPlaceholderText('Write your todo...')).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
        })

        it('should dispatch addTodo and trigger onClose when add new todo', async () => {
            const addTodoSpy = vi.spyOn(todoSlice, 'addTodo')
            renderWithProviders(<TodoModal showModal={true} {...{ onConfirm, onClose }} />)

            await userEvent.type(screen.getByRole('textbox'), 'Todo Task A')
            await userEvent.click(screen.getByRole('button', { name: 'Add' }))

            expect(addTodoSpy).toBeCalled()
            expect(onClose).toBeCalled()
        })
    })

    describe('Update Todo', () => {
        it('should render Add Todo modal when showModal is true and no editingTodo', () => {
            const mockEditingTodo: Todo = { id: 1, todo: 'Todo Task A', completed: false }
            renderWithProviders(<TodoModal showModal={true} editingTodo={mockEditingTodo} {...{ onConfirm, onClose }} />)

            expect(screen.getByText('Edit Todo')).toBeInTheDocument()
            expect(screen.getByText('Todo Task A')).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
        })

        it('should dispatch saveTodo and trigger onClose when save todo', async () => {
            const updateTodoSpy = vi.spyOn(todoSlice, 'updateTodo')
            const mockEditingTodo: Todo = { id: 1, todo: 'Todo Task A', completed: false }

            renderWithProviders(<TodoModal showModal={true} editingTodo={mockEditingTodo} {...{ onConfirm, onClose }} />)

            await userEvent.type(screen.getByRole('textbox'), 'Todo Task B')
            await userEvent.click(screen.getByRole('button', { name: 'Save' }))

            expect(updateTodoSpy).toBeCalled()
            expect(onClose).toBeCalled()
        })

        it('should not dispatch saveTodo when close button is clicked', async () => {
            const updateTodoSpy = vi.spyOn(todoSlice, 'updateTodo')
            const mockEditingTodo: Todo = { id: 1, todo: 'Todo Task A', completed: false }

            renderWithProviders(<TodoModal showModal={true} editingTodo={mockEditingTodo} {...{ onConfirm, onClose }} />)

            await userEvent.type(screen.getByRole('textbox'), 'Todo Task B')
            await userEvent.click(screen.getByRole('button', { name: 'Close' }))

            expect(updateTodoSpy).not.toBeCalled()
            expect(onClose).toBeCalled()
        })
    })


})