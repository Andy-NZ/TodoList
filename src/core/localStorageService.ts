import { LOCAL_STORAGE_KEY } from "./config"
import { Todo } from "./types"

class LocalStorageService {
    isTodosUndeinfed = (): boolean => localStorage.getItem(LOCAL_STORAGE_KEY) == undefined

    getTodos = (): Todo[] => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY)
        return data ? JSON.parse(data) : []
    }

    saveTodos = (todos: Todo[]) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }
}

export const localStorageService = new LocalStorageService()