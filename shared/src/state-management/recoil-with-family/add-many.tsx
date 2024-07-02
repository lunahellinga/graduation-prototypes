import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Todo, TodoState } from "@/lib/model";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import {
  todoAtom,
  todoIdsAtom,
} from "@/state-management/recoil-with-family/atoms";

const AddManyTodosButton = () => {
  const todoIds = useRecoilValue(todoIdsAtom);

  const addManyTodos = () => {
    const startId = Math.max(...todoIds);
    const newTodos: Array<Todo> = Array.from({ length: 1000 }, (_, i) => ({
      id: startId + i + 1,
      title: `Todo ${todoIds.length + i + 1}`,
      description: `Description of todo ${todoIds.length + i + 1}`,
      created: new Date(),
      state: TodoState.todo,
    }));
    newTodos.forEach((todo) => addTodoRemote(todo));
  };

  const addTodoRemote = useRecoilCallback(
    ({ set }) =>
      (todo: Todo) =>
        set(todoAtom(todo.id), todo)
  );

  return <Button onClick={() => addManyTodos()}>Add Many Todos</Button>;
};

export default AddManyTodosButton;
