import React from "react";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/queries/template";
import { getNewConcurrentTodos } from "@/lib/utils";
import {
  todoListSplitAtom,
} from "@/state-management/jotai/atoms";
import { useSetAtom } from "jotai/index";

const AddConcurrentRemote = () => {
  const todoDispatch = useSetAtom(todoListSplitAtom);
  const addConcurrentTodos = async () => {
    const newTodos = getNewConcurrentTodos();
    const adders = newTodos.map((todo) =>
      addTodo(todo).then((res) => {
        if (res) todoDispatch({ type: "insert", value: res });
      }),
    );

    await Promise.all(adders);
  };

  return (
    <Button onClick={() => addConcurrentTodos()}>Add Concurrent Remote</Button>
  );
};

export default AddConcurrentRemote;
