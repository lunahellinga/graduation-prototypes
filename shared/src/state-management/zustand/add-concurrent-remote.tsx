import React from "react";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/queries/template";
import { useHookstate } from "@hookstate/core";
import { getNewConcurrentTodos } from "@/lib/utils";
import {globalTodos} from "@/state-management/hookstate/list";

const AddConcurrentRemote = () => {
  const todos = useHookstate(globalTodos);
  const addConcurrentTodos = async () => {
    const newTodos = getNewConcurrentTodos();
    const adders = newTodos.map((todo) =>
      addTodo(todo).then((res) => {
        if (res) todos.merge([res]);
      }),
    );

    await Promise.all(adders);
  };

  return (
    <Button onClick={() => addConcurrentTodos()}>Add Concurrent Remote</Button>
  );
};

export default AddConcurrentRemote;
