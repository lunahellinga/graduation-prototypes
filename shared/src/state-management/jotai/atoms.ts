import { PartialTodo, Todo } from "@/lib/model";
import { newPartialTodo } from "@/lib/utils";
import { atom } from "jotai";
import { splitAtom, atomFamily } from "jotai/utils";
import { todoAtom } from "@/state-management/recoil-with-family/atoms";


export const todoListAtom = atom<Todo[]>([]);
export const todoListSplitAtom = splitAtom(todoListAtom);

export const maxIdAtom = atom((get) =>
  get(todoListAtom).reduce((ac, cu) => (ac >= cu.id ? ac : cu.id), 0),
);

export const newTodoAtom = atom<PartialTodo>(newPartialTodo);

export const currentPageAtom = atom<number>(1);
export const pagesAtom = atom<number[]>([1]);


export const todoAtomFamily = atomFamily(
  (todo: Todo) => atom<Todo>(todo),
  (a: Todo, b: Todo) => a.id === b.id,
);
export const todosAtom = atom<number[]>([]);

export const todoWriteAtom = atom(null, (get, set, todo: Todo) => {
  todoAtomFamily(todo);
  set(todosAtom, (c) => (c.indexOf(todo.id) === -1 ? [...c, todo.id] : c));
});

export const todoAllAtom = atom((get) =>
  get(todosAtom).map((id) =>
    get(todoAtomFamily({ id: id, created: new Date(), ...newPartialTodo })),
  ),
);
