

export type PartialTodo = {
  title: string,
  description?: string,
  state: TodoState
}

export type Todo = PartialTodo & {
  id: number,
  created: Date,
}

export enum TodoState {
  todo,
  doing,
  done,
  cancelled
}