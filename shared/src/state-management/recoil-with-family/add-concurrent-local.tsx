import React from "react";
import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/model";
import { getNewLocalConcurrentTodos } from "@/lib/utils";
import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  todoAtom,
  todoIdsAtom,
} from "@/state-management/recoil-with-family/atoms";

const AddConcurrentLocal = () => {
  const todoIds = useRecoilValue(todoIdsAtom);
  const addConcurrentTodos = async () => {
    const startId = Math.max(...todoIds);
    const newTodos: Array<Todo> = getNewLocalConcurrentTodos(startId);
    const adders = newTodos.map((todo) => addTodoLocal(todo));

    await Promise.all(adders);
  };

  const addTodoLocal = useRecoilCallback(
    ({ set }) =>
      async (todo: Todo) => {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 200),
        );
        set(todoAtom(todo.id), todo);
      }
  );

  return (
    <Button onClick={() => addConcurrentTodos()}>Add Concurrent Local</Button>
  );
};

export default AddConcurrentLocal;
