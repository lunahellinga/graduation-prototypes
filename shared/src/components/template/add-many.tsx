import React from "react";
import { Button } from "@/components/ui/button";
import { Todo, TodoState } from "@/lib/model";
import {getHighestId} from "@/lib/utils";

const addManyTodos = (
  todos: Array<Todo>,
  setTodos: (todos: Array<Todo>) => void,
) => {
  const startId = getHighestId(todos)
  const newTodos: Array<Todo> = Array.from({ length: 1000 }, (_, i) => ({
    id: startId + i + 1,
    title: `Todo ${todos.length + i + 1}`,
    description: `Description of todo ${todos.length + i + 1}`,
    created: new Date(),
    state: TodoState.todo,
  }));
  setTodos([...todos, ...newTodos]);
};

type AddManyProps = {
  todos: Array<Todo>;
  setTodos: (todos: Array<Todo>) => void;
};
const AddManyTodosButton = ({ todos, setTodos }: AddManyProps) => {
  return (
    <Button onClick={() => addManyTodos(todos, setTodos)}>
      Add Many Todos
    </Button>
  );
};

export default AddManyTodosButton;
