import React from "react";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/queries/template";
import { getNewConcurrentTodos } from "@/lib/utils";
import { useSetRecoilState } from "recoil";
import { todoAtom } from "@/state-management/recoil-with-family/atoms";

const addConcurrentTodos = async () => {
  const newTodos = getNewConcurrentTodos();
  const adders = newTodos.map((todo) =>
    addTodo(todo).then((res) => {
      if (res) useSetRecoilState(todoAtom(res.id))(res);
    }),
  );

  await Promise.all(adders);
};

const AddConcurrentRemote = () => {
  return (
    <Button onClick={() => addConcurrentTodos()}>Add Concurrent Remote</Button>
  );
};

export default AddConcurrentRemote;
