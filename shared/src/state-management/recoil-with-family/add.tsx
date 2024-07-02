import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/queries/template";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StateButtons } from "@/state-management/recoil-with-family/stateButtons";
import {useRecoilCallback, useRecoilState, useSetRecoilState} from "recoil";
import {
  newTodoAtom,
  todoAtom,
} from "@/state-management/recoil-with-family/atoms";
import { newPartialTodo } from "@/lib/utils";
import { Todo } from "@/lib/model";

const AddTodo = () => {
  const [partialTodo, setPartialTodo] = useRecoilState(newTodoAtom);
  const [loading, setLoading] = useState(false);

  const setTodo = useRecoilCallback(
    ({ set }) =>
      (todo: Todo) =>
        set(todoAtom(todo.id),todo)
  );


  return (
    <div className="max-w-screen-md flex flex-row gap-4 p-3 border-2 rounded-lg">
      <div className="flex flex-col justify-start w-80 gap-4">
        <Label htmlFor={`new-todo-title`}>Title</Label>
        <Input
          id={`new-todo-title`}
          placeholder="Title"
          onChange={(e) =>
            setPartialTodo((c) => ({ ...c, title: e.target.value }))
          }
          value={partialTodo.title}
        />
        <Label htmlFor={`new-todo-description`}>Description</Label>
        <Input
          id={`new-todo-description`}
          placeholder="Description..."
          onChange={(e) =>
            setPartialTodo((c) => ({ ...c, description: e.target.value }))
          }
          value={partialTodo.description}
        />
      </div>
      <div className="flex flex-col w-28 gap-2">
        <StateButtons atom={newTodoAtom} />
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            addTodo(partialTodo)
              .then((res) => {
                if (res) setTodo(res);
              })
              .then(() => setPartialTodo(newPartialTodo))
              .finally(() => setLoading(false));
          }}
        >
          Add Todo
        </Button>
      </div>
    </div>
  );
};

export default AddTodo;
