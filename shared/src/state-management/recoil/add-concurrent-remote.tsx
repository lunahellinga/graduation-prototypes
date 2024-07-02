import React from "react";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/queries/template";
import { getNewConcurrentTodos } from "@/lib/utils";
import {useSetRecoilState} from "recoil";
import { todoListAtom } from "@/state-management/recoil/atoms";

const AddConcurrentRemote = () => {
  const setTodos = useSetRecoilState(todoListAtom);
  const addConcurrentTodos = async () => {
    const newTodos = getNewConcurrentTodos();
    const adders = newTodos.map((todo) =>
      addTodo(todo).then((res) => {
        if (res) setTodos((c) => [...c, res]);
      }),
    );

    await Promise.all(adders);
  };

  return (
    <Button onClick={() => addConcurrentTodos()}>Add Concurrent Remote</Button>
  );
};

export default AddConcurrentRemote;
