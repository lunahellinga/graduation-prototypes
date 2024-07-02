import { Todo } from "@/lib/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    removeTodoById(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodoById(state, action: PayloadAction<Todo>) {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };
      }
    },
    updateTodos(state, action: PayloadAction<Todo[]>) {
      action.payload.forEach((updated) => {
        const index = state.todos.findIndex((todo) => todo.id === updated.id);
        if (index !== -1) {
          state.todos[index] = updated;
        }
      });
    },
  },
});

export const {
  setTodos,
  addTodo,
  removeTodoById,
  updateTodoById,
  updateTodos,
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
