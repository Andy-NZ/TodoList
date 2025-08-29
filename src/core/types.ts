export interface Todo {
    id: number,
    todo: string,
    completed: boolean,
}

export type NewTodo = Omit<Todo, 'id'>

export interface TodosApiResponse {
    todos: Todo[],
    total: number,
    skip: number,
    limit: number
}