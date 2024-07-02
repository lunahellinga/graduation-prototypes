import {atom, atomFamily} from "recoil";
import { PartialTodo, Todo } from "@/lib/model";
import { newPartialTodo } from "@/lib/utils";

export const todoListAtom = atom<Todo[]>({
  key: "TodoList",
  default: [],
});

  export const newTodoAtom = atom<PartialTodo>({
  key: "NewTodo",
  default: newPartialTodo,
});

export const currentPageAtom = atom<number>({
  key: 'CurrentPage',
  default: 1
})
export const pagesAtom = atom<number[]>({
  key: 'Pages',
  default: [1]
})
