import { create } from "zustand";
import {PartialTodo, Todo, TodoState} from "@/lib/model";

interface TodoStoreState {
  todos: Todo[];
  wipTodo: PartialTodo;
  set: (todos: Todo[]) => void,
  add: (todo: Todo) => void;
  delete: (id: number) => void;
  update: (todo: Todo) => void;
}

export const useTodoStore = create<TodoStoreState>((set) => ({
  todos: [],
  wipTodo: {
    title: "",
    description: "",
    state: TodoState.todo,
  },
  set: (todos) => set(() => ({todos: todos}) ),
  add: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  delete: (id) =>
    set((state) => {
      const removeIndex = state.todos.findIndex((t) => t.id === id);
      const newTodos = [...state.todos];
      newTodos.splice(removeIndex, 1);
      return { todos: newTodos };
    }),
  update: (todo) =>
    set((state) => {
      const updateIndex = state.todos.findIndex((t) => t.id === todo.id);
      const newTodos = [...state.todos];
      newTodos[updateIndex] = todo;
      return { todos: newTodos };
    }),
}));
