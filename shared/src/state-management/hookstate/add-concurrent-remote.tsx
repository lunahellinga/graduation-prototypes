import React from "react";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/queries/template";
import { Todo } from "@/lib/model";
import { useHookstate } from "@hookstate/core";
import { globalTodos } from "@/state-management/hookstate/list";
import { getNewConcurrentTodos } from "@/lib/utils";

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
