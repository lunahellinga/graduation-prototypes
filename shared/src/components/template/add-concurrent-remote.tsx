import React from "react";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/queries/template";
import { Todo, TodoState } from "@/lib/model";
import { getNewConcurrentTodos } from "@/lib/utils";

const addConcurrentTodos = async (
  setTodos: (
    value: ((prevState: Array<Todo>) => Array<Todo>) | Array<Todo>,
  ) => void,
) => {
  const newTodos = getNewConcurrentTodos();
  const adders = newTodos.map((todo) =>
    addTodo(todo).then((res) => {
      if (res) setTodos((c) => [...c, res]);
    }),
  );

  await Promise.all(adders);
};

type AddConcurrentRemoteProps = {
  setTodos: (value: (((prevState: Array<Todo>) => Array<Todo>) | Array<Todo>)) => void;
};
const AddConcurrentRemote = ({ setTodos }: AddConcurrentRemoteProps) => {
  return (
    <Button onClick={() => addConcurrentTodos(setTodos)}>
      Add Concurrent Remote
    </Button>
  );
};

export default AddConcurrentRemote;
