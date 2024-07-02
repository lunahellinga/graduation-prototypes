import React from "react";
import { Button } from "@/components/ui/button";
import {Todo, TodoState} from "@/lib/model";
import {getHighestId} from "@/lib/utils";

const addConcurrentTodos = async (
  todos: Array<Todo>,
  setTodos: (
    value: ((prevState: Array<Todo>) => Array<Todo>) | Array<Todo>,
  ) => void,
) => {
  const startId = getHighestId(todos)
  const newTodos:Array<Todo> = [
    {
      id: startId+1,
      title: `Local Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.todo,
      created :new Date()
    },
    {
      id: startId+2,
      title: `Local Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.done,
      created :new Date()
    },
    {
      id: startId+3,
      title: `Local Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.doing,
      description: "This takes a lot of time...",
      created :new Date()
    },
    {
      id: startId+4,
      title: `Local Concurrent Todo ${crypto.randomUUID().slice(0, 4)}`,
      state: TodoState.cancelled,
      description: "Nope",
      created :new Date()
    },
  ];
  const adders = newTodos.map((todo) => addTodoLocal(todo, setTodos));

  await Promise.all(adders);
};

async function addTodoLocal(
  todo: Todo,
  setTodos: (
    value: ((prevState: Array<Todo>) => Array<Todo>) | Array<Todo>,
  ) => void,
) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 200));
  setTodos((v: Array<Todo>) => [...v, todo]);
}

type AddConcurrentLocalProps = {
  todos: Array<Todo>;
  setTodos: (
    value: ((prevState: Array<Todo>) => Array<Todo>) | Array<Todo>,
  ) => void;
};
const AddConcurrentLocal = ({ todos, setTodos }: AddConcurrentLocalProps) => {
  return (
    <Button onClick={() => addConcurrentTodos(todos, setTodos)}>
      Add Concurrent Local
    </Button>
  );
};

export default AddConcurrentLocal;
