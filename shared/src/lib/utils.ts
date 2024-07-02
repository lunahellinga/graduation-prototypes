import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {PartialTodo, Todo, TodoState} from "@/lib/model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHighestId(todos: Array<Todo>) {
  return todos.reduce((acc, curr) => (acc > curr.id ? acc : curr.id), 0);
}

export function replaceItemAtIndex<T>(arr: Array<T>, index: number, newValue: T) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex<T>(arr:Array<T>, index:number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export const newPartialTodo: PartialTodo = {
  title: "",
  description: "",
  state: TodoState.todo,
};

export function getNewConcurrentTodos() {
  return [
    {
      title: `Remote Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.todo,
    },
    {
      title: `Remote Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.done,
    },
    {
      title: `Remote Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.doing,
      description: "This takes a lot of time...",
    },
    {
      title: `Remote Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.cancelled,
      description: "Nope",
    },
  ];
}

export function getNewLocalConcurrentTodos(startId: number) {
  return [
    {
      id: startId + 1,
      title: `Local Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.todo,
      created: new Date(),
    },
    {
      id: startId + 2,
      title: `Local Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.done,
      created: new Date(),
    },
    {
      id: startId + 3,
      title: `Local Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.doing,
      description: "This takes a lot of time...",
      created: new Date(),
    },
    {
      id: startId + 4,
      title: `Local Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.cancelled,
      description: "Nope",
      created: new Date(),
    },
  ];
}
