import React from "react";
import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/model";
import { getNewLocalConcurrentTodos } from "@/lib/utils";
import {useHookstate} from "@hookstate/core";
import {globalTodos} from "@/state-management/hookstate/list";
import {getHighestId} from "@/state-management/hookstate/util";

const AddConcurrentLocal = () => {
  const todos = useHookstate(globalTodos);
  const addConcurrentTodos = async () => {
    const startId = getHighestId();
    const newTodos: Array<Todo> = getNewLocalConcurrentTodos(startId);
    const adders = newTodos.map((todo) => addTodoLocal(todo))

    await Promise.all(adders);
  };

  async function addTodoLocal(
    todo: Todo
  ) {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 200));
    todos.merge([todo]);
  }


  return (
    <Button onClick={() => addConcurrentTodos()}>
      Add Concurrent Local
    </Button>
  );
};

export default AddConcurrentLocal;
