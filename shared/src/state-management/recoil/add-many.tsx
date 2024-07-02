import React from "react";
import { Button } from "@/components/ui/button";
import { Todo, TodoState } from "@/lib/model";
import { useRecoilState } from "recoil";
import { todoListAtom } from "@/state-management/recoil/atoms";
import { getHighestId } from "@/lib/utils";

const AddManyTodosButton = () => {
  const [todos, setTodos] = useRecoilState(todoListAtom);

  const addManyTodos = () => {
    const startId = getHighestId(todos);
    const newTodos: Array<Todo> = Array.from({ length: 1000 }, (_, i) => ({
      id: startId + i + 1,
      title: `Todo ${todos.length + i + 1}`,
      description: `Description of todo ${todos.length + i + 1}`,
      created: new Date(),
      state: TodoState.todo,
    }));
    setTodos((c) => [...c, ...newTodos]);
  };
  return <Button onClick={() => addManyTodos()}>Add Many Todos</Button>;
};

export default AddManyTodosButton;
