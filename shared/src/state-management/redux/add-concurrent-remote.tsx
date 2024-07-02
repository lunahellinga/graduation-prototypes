import React from "react";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/queries/template";
import { Todo, TodoState } from "@/lib/model";
import {getNewConcurrentTodos} from "@/lib/utils";

const addConcurrentTodos = async (
  todos: Array<Todo>,
  setTodos: (todos: Array<Todo>) => void,
) => {
  const newTodos = getNewConcurrentTodos();
  const adders = newTodos.map((todo) => addTodo(todo));

  await Promise.all(adders).then((values) => {
    // @ts-ignore
    const newTodos: Array<Todo> = values.filter((value) => value);
    setTodos([...todos, ...newTodos]);
  });
};

type AddConcurrentRemoteProps = {
  todos: Array<Todo>;
  setTodos: (todos: Array<Todo>) => void;
};
const AddConcurrentRemote = ({
  todos,
  setTodos,
}: AddConcurrentRemoteProps) => {
  return (
    <Button onClick={() => addConcurrentTodos(todos, setTodos)}>
      Add Concurrent Remote
    </Button>
  );
};

export default AddConcurrentRemote;
