import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { localStorageService } from "../core/localStorageService";
import type { NewTodo, Todo, TodosApiResponse } from "../core/types";

export const fetchInitialTodos = createAsyncThunk(
  "todos/fetchInitialTodos",
  async () => {
    const res = await fetch("https://dummyjson.com/todos");
    const data = (await res.json()) as TodosApiResponse;
    return data.todos;
  }
);

const initialState: Todo[] = localStorageService.getTodos();

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: (create) => ({
    addTodo: (state, action: PayloadAction<NewTodo>) => {
      const maxId = state.reduce((savedId, currentItem) => {
        return currentItem.id > savedId ? currentItem.id : savedId;
      }, 0);

      state.unshift({
        id: maxId + 1,
        ...action.payload,
      });

      localStorageService.saveTodos(state);
    },
    updateTodo: create.reducer((state, action: PayloadAction<Todo>) => {
      const index = state.findIndex((todo) => todo.id == action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorageService.saveTodos(state);
      }
    }),
    deleteTodo: create.reducer((state, action: PayloadAction<number>) => {
      const newTodos = state.filter((todo) => todo.id !== action.payload);
      localStorageService.saveTodos(newTodos);
      return newTodos;
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchInitialTodos.fulfilled, (state, action) => {
      if (state.length === 0) {
        localStorageService.saveTodos(action.payload);
        return action.payload;
      }
    });
  },

  selectors: {
    selectTodos: (todos) => todos,
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export const { selectTodos } = todoSlice.selectors;
export default todoSlice.reducer;
