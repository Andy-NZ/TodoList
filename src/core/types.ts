export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export type NewTodo = Omit<Todo, "id">;

export type TodosApiResponse = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
};
