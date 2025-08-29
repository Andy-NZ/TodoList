import type { AppStore} from "../app/store";
import { makeStore } from "../app/store"
import type { NewTodo, Todo } from "../core/types"
import { localStorageService } from "../core/localStorageService"
import reducer, { addTodo, deleteTodo, selectTodos, todoSlice, updateTodo } from "./todosSlice"

type LocalTestContext = {
    store: AppStore
}

describe('todoSlice', () => {
    const mockTodos: Todo[] = [
        { id: 1, todo: 'Todo task A', completed: false },
        { id: 2, todo: 'Todo task B', completed: false },
    ]

    beforeEach<LocalTestContext>(context => {
        const initialState: Todo[] = mockTodos
        const store = makeStore({ todos: initialState })

        context.store = store
    })

    it('should return the initial state from localStorage', () => {
        const initialState = todoSlice.reducer(undefined, { type: 'unknown' })
        expect(initialState).toStrictEqual([])
    })

    it<LocalTestContext>('should add a new todo', ({ store }) => {
        const saveTodosSpy = vi.spyOn(localStorageService, "saveTodos")
        const newTodo: NewTodo = { todo: 'Test add', completed: false }

        store.dispatch(addTodo(newTodo))

        const state = selectTodos(store.getState())
        expect(state).toHaveLength(3)
        expect(state[0].todo).toEqual('Test add')
        expect(state[0].completed).toBeFalsy()
        expect(state[0].id).toEqual(3)
        expect(saveTodosSpy).toHaveBeenCalled()
    })

    it('should add a todo with correct Id', () => {
        const newTodo: NewTodo = {
            todo: 'New Todo Task',
            completed: false,
        }

        const state = reducer(mockTodos, addTodo(newTodo))

        expect(state[0].id).toEqual(3)
        expect(state[0].todo).toEqual('New Todo Task')
    })

    it<LocalTestContext>('should update a todo', ({ store }) => {
        const saveTodosSpy = vi.spyOn(localStorageService, "saveTodos")
        const updated: Todo = { id: 1, todo: 'Updated todo', completed: true, }

        store.dispatch(updateTodo(updated))

        const state = selectTodos(store.getState())
        expect(state[0].todo).toEqual('Updated todo')
        expect(state[0].completed).toBeTruthy()
        expect(saveTodosSpy).toHaveBeenCalled()
    })

    it<LocalTestContext>('should delete a todo', ({ store }) => {
        const saveTodosSpy = vi.spyOn(localStorageService, "saveTodos")

        store.dispatch(deleteTodo(1))

        const state = selectTodos(store.getState())
        expect(state).toHaveLength(1)
        expect(state[0].todo).toEqual('Todo task B')
        expect(saveTodosSpy).toHaveBeenCalled()
    })
})