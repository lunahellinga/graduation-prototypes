import React from "react";
import { Button } from "@/components/ui/button";
import { Todo, TodoState } from "@/lib/model";
import { useHookstate } from "@hookstate/core";
import { globalTodos } from "@/state-management/hookstate/list";
import { getHighestId } from "@/state-management/hookstate/util";

const AddManyTodosButton = () => {
  const todos = useHookstate(globalTodos);

  const addManyTodos = () => {
    const startId = getHighestId();
    const newTodos: Array<Todo> = Array.from({ length: 1000 }, (_, i) => ({
      id: startId + i + 1,
      title: `Todo ${todos.length + i + 1}`,
      description: `Description of todo ${todos.length + i + 1}`,
      created: new Date(),
      state: TodoState.todo,
    }));
    todos.merge(newTodos);
  };
  return <Button onClick={() => addManyTodos()}>Add Many Todos</Button>;
};

export default AddManyTodosButton;
