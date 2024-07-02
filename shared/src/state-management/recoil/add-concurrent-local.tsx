import React from "react";
import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/model";
import { getHighestId, getNewLocalConcurrentTodos } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { todoListAtom } from "@/state-management/recoil/atoms";

const AddConcurrentLocal = () => {
  const [todos, setTodos] = useRecoilState(todoListAtom);
  const addConcurrentTodos = async () => {
    const startId = getHighestId(todos);
    const newTodos: Array<Todo> = getNewLocalConcurrentTodos(startId);
    const adders = newTodos.map((todo) => addTodoLocal(todo));

    await Promise.all(adders);
  };

  async function addTodoLocal(todo: Todo) {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 200));
    setTodos((c) => [...c, todo]);
  }

  return (
    <Button onClick={() => addConcurrentTodos()}>Add Concurrent Local</Button>
  );
};

export default AddConcurrentLocal;
