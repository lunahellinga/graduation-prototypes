import React from "react";
import { Button } from "@/components/ui/button";
import { Todo, TodoState } from "@/lib/model";
import { maxIdAtom, todoListSplitAtom } from "@/state-management/jotai/atoms";
import { useAtomValue, useSetAtom } from "jotai/index";

const AddManyTodosButton = () => {
  const todoDispatch = useSetAtom(todoListSplitAtom);
  const maxId = useAtomValue(maxIdAtom);

  const addManyTodos = () => {
    const newTodos: Array<Todo> = Array.from({ length: 1000 }, (_, i) => ({
      id: maxId + i + 1,
      title: `Todo ${maxId + i + 1}`,
      description: `Description of todo ${maxId + i + 1}`,
      created: new Date(),
      state: TodoState.todo,
    }));
    newTodos.map((todo) => todoDispatch({ type: "insert", value: todo }));
  };
  return <Button onClick={() => addManyTodos()}>Add Many Todos</Button>;
};

export default AddManyTodosButton;
