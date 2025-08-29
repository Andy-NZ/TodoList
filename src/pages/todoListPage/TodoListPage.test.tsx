import { screen, within } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { makeStore } from "../../app/store";
import type { Todo } from "../../core/types";
import { TodoListPage } from "./TodoListPage";
import type { AppStore} from "../../app/store";
import * as todoSlice from "../../slices/todosSlice";
import { renderWithProviders } from "../../utils/test-utils";
import { localStorageService } from "../../core/localStorageService";

type LocalTestContext = {
    store: AppStore
}

describe('TodoListPage', () => {
    const mockTodos: Todo[] = [
        { id: 1, todo: 'Todo task A', completed: false },
        { id: 2, todo: 'Todo task B', completed: true },
    ]

    beforeEach<LocalTestContext>(context => {
        const initialState: Todo[] = mockTodos
        const store = makeStore({ todos: initialState })

        context.store = store

        vi.clearAllMocks()

        vi.spyOn(localStorageService, 'isTodosUndeinfed').mockReturnValue(false)
    })

    describe('Fetch Initial Todos', () => {
        it('should dispatch fetchinitialTodos if todos are undefined in localstorage', () => {
            vi.spyOn(localStorageService, 'isTodosUndeinfed').mockReturnValueOnce(true)
            const fetchInitialTodosSpy = vi.spyOn(todoSlice, 'fetchInitialTodos')

            renderWithProviders(<TodoListPage />)

            expect(fetchInitialTodosSpy).toBeCalled()
        })

        it('should not dispatch fetchinitialTodos if todos exist in localstorage', () => {
            const fetchInitialTodosSpy = vi.spyOn(todoSlice, 'fetchInitialTodos')

            renderWithProviders(<TodoListPage />)

            expect(fetchInitialTodosSpy).not.toBeCalled()
        })
    })

    describe('Add New Todo', () => {
        it<LocalTestContext>('should show add todo modal when click "+ Add New Todo" button', async ({ store }) => {
            renderWithProviders(<TodoListPage />, { store })

            const addTodoButton = screen.getByRole('button', { name: '+ Add New Todo' })
            await userEvent.click(addTodoButton)

            expect(screen.getByRole('dialog')).toBeVisible()
            expect(screen.getByText('Add Todo')).toBeVisible()
        })


        it<LocalTestContext>('should add new todo to list when new todo is added', async ({ store }) => {
            renderWithProviders(<TodoListPage />, { store })

            const addTodoButton = screen.getByRole('button', { name: '+ Add New Todo' })
            await userEvent.click(addTodoButton)

            const modal = screen.getByRole('dialog')
            const textArea = screen.getByRole('textbox')
            const addButton = screen.getByRole('button', { name: 'Add' })

            expect(modal).toBeVisible()

            await userEvent.type(textArea, 'new Todo task')
            await userEvent.click(addButton)

            expect(screen.queryByRole('dialog')).toBeNull()
            expect(screen.getByText('new Todo task')).toBeVisible()
        })
    })

    describe('Todo List', () => {
        it<LocalTestContext>('should render todo list', ({ store }) => {
            renderWithProviders(<TodoListPage />, { store })

            expect(screen.getByText('Todo task A')).toBeInTheDocument()
            expect(screen.getByText('Todo task B')).toBeInTheDocument()
        })

        it<LocalTestContext>('should show update todo modal when click "Edit" button', async ({ store }) => {
            renderWithProviders(<TodoListPage />, { store })

            const editButtons = screen.queryAllByRole('button', { name: 'Edit' })
            await userEvent.click(editButtons[0])

            const modal = screen.getByRole('dialog')
            const textArea = screen.getByRole('textbox')

            expect(modal).toBeVisible()
            expect(modal).toHaveTextContent('Edit Todo')
            expect(textArea).toHaveValue('Todo task A')
        })

        it<LocalTestContext>('should update todo item when updated todo is saved', async ({ store }) => {
            renderWithProviders(<TodoListPage />, { store })

            const editButtons = screen.queryAllByRole('button', { name: 'Edit' })
            await userEvent.click(editButtons[0])

            const modal = screen.getByRole('dialog')
            const textArea = screen.getByRole('textbox')
            const saveButton = screen.getByRole('button', { name: 'Save' })

            expect(modal).toBeVisible()
            expect(textArea).toHaveValue('Todo task A')

            await userEvent.clear(textArea)
            await userEvent.type(textArea, 'new Todo task A')
            await userEvent.click(saveButton)

            expect(screen.queryByRole('dialog')).toBeNull()
            expect(screen.getByText('new Todo task A')).toBeVisible()
        })

        it<LocalTestContext>('should delete todo from list when confirm delete is clicked', async ({ store }) => {
            renderWithProviders(<TodoListPage />, { store })

            expect(screen.getByText('Todo task A')).toBeVisible()

            const deleteButtons = screen.queryAllByRole('button', { name: 'Delete' })
            await userEvent.click(deleteButtons[0])

            expect(screen.getByText('Are you sure you want to delete it?')).toBeVisible()

            const modal = screen.getByRole('dialog')
            await userEvent.click(within(modal).getByRole('button', { name: 'Delete' }))

            expect(screen.queryByText('Todo task A')).toBeNull()
        })

        it<LocalTestContext>('should not delete todo from list when cancel delete is clicked', async ({ store }) => {
            renderWithProviders(<TodoListPage />, { store })

            expect(screen.getByText('Todo task A')).toBeVisible()

            const deleteButtons = screen.queryAllByRole('button', { name: 'Delete' })
            await userEvent.click(deleteButtons[0])

            expect(screen.getByText('Are you sure you want to delete it?')).toBeVisible()

            await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

            expect(screen.getByText('Todo task A')).toBeVisible()
        })
    })
})