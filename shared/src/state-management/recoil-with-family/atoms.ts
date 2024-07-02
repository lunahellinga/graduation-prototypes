import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { PartialTodo, Todo } from "@/lib/model";
import { newPartialTodo } from "@/lib/utils";

const todoAtomFamily = atomFamily<Todo, number>({
  key: "TodoAtomFamily",
});

export const todoIdsAtom = atom<number[]>({
  key: "TodoIdsAtom",
  default: [],
});

export const todoAtom = selectorFamily({
  key: "TodoSelector",
  get:
    (id: number) =>
    ({ get }) => {
      return get(todoAtomFamily(id));
    },
  set:
    (id: number) =>
    ({ set }, todo) => {
      set(todoAtomFamily(id), todo);
      set(todoIdsAtom, (todos) => {
        if (todos.includes(id)) return todos;
        return [...todos, id];
      });
    },
});

export const getAtomTodos = selector({
  key: "GetAtomTodos",
  get: ({ get }) => get(todoIdsAtom).map((id) => get(todoAtom(id))),
});

export const useSetTodos = () => {
  return useRecoilCallback(({ snapshot, set, reset }) => (todos: Todo[]) => {
    const ids = snapshot.getLoadable(todoIdsAtom);
    for (const id of ids.contents) {
      reset(todoAtomFamily(id));
    }
    reset(todoIdsAtom);
    for (const todo of todos) {
      set(todoAtomFamily(todo.id), todo);
      set(todoIdsAtom, (todos) => [...todos, todo.id]);
    }
  });
};

export const useRemoveTodo = () => {
  return useRecoilCallback(({ set, reset }) => (id: number) => {
    reset(todoAtomFamily(id));
    set(todoIdsAtom, (todos) => todos.filter((todo) => todo !== id));
  });
};

export const newTodoAtom = atom<PartialTodo>({
  key: "NewTodo",
  default: newPartialTodo,
});

export const currentPageAtom = atom<number>({
  key: "CurrentPage",
  default: 1,
});
export const pagesAtom = atom<number[]>({
  key: "Pages",
  default: [1],
});
