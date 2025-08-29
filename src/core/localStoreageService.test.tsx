import { LOCAL_STORAGE_KEY } from "./config"
import { localStorageService } from "./localStorageService"
import { Todo } from "./types"

describe('localStorageService', () => {
    const mockTodos: Todo[] = [
        { id: 1, todo: 'Todo task A', completed: false },
        { id: 2, todo: 'Todo task B', completed: false },
    ]

    const mockTodosStr = JSON.stringify(mockTodos)

    beforeEach(() => {
        localStorage.clear()
    })

    describe('isTodosUndefined', () => {
        it('should return true when localStorage key is not set', () => {
            expect(localStorageService.isTodosUndeinfed).toBeTruthy()
        })

        it('should return false when localStorage key is set', () => {
            localStorage.setItem(LOCAL_STORAGE_KEY, mockTodosStr)
            expect(localStorageService.isTodosUndeinfed()).toBeFalsy()
        })
    })

    describe('getTodos', () => {
        it('should return empty array when no todos are stored', () => {
            expect(localStorageService.getTodos().length).toEqual(0)
        })

        it('should return todos array when stored todos in localStorage', () => {
            localStorage.setItem(LOCAL_STORAGE_KEY, mockTodosStr)
            expect(localStorageService.getTodos()).toEqual(mockTodos)
        })
    })

    it('should save todos to localStorage', () => {
        localStorageService.saveTodos(mockTodos)
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
        expect(savedData).toEqual(mockTodosStr)
    })
})