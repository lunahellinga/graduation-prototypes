import React from "react";
import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/model";
import { getHighestId, getNewLocalConcurrentTodos } from "@/lib/utils";
import { maxIdAtom, todoListSplitAtom } from "@/state-management/jotai/atoms";
import { useSetAtom } from "jotai/index";
import { useAtomValue } from "jotai";

const AddConcurrentLocal = () => {
  const todoDispatch = useSetAtom(todoListSplitAtom);
  const maxId = useAtomValue(maxIdAtom);
  const addConcurrentTodos = async () => {
    const newTodos: Array<Todo> = getNewLocalConcurrentTodos(maxId);
    const adders = newTodos.map((todo) => addTodoLocal(todo));

    await Promise.all(adders);
  };

  async function addTodoLocal(todo: Todo) {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 200));
    todoDispatch({ type: "insert", value: todo });
  }

  return (
    <Button onClick={() => addConcurrentTodos()}>Add Concurrent Local</Button>
  );
};

export default AddConcurrentLocal;
