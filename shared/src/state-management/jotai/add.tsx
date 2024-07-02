import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { TodoState } from "@/lib/model";
import { addTodo } from "@/lib/queries/template";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StateButtons } from "@/state-management/jotai/stateButtons";
import {
  newTodoAtom,
  todoListSplitAtom,
} from "@/state-management/jotai/atoms";
import { newPartialTodo } from "@/lib/utils";
import { useAtom, useSetAtom } from "jotai";

const AddTodo = () => {
  const todoDispatch = useSetAtom(todoListSplitAtom);
  const [todo, setTodo] = useAtom(newTodoAtom);
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-screen-md flex flex-row gap-4 p-3 border-2 rounded-lg">
      <div className="flex flex-col justify-start w-80 gap-4">
        <Label htmlFor={`new-todo-title`}>Title</Label>
        <Input
          id={`new-todo-title`}
          placeholder="Title"
          onChange={(e) => setTodo((c) => ({ ...c, title: e.target.value }))}
          value={todo.title}
        />
        <Label htmlFor={`new-todo-description`}>Description</Label>
        <Input
          id={`new-todo-description`}
          placeholder="Description..."
          onChange={(e) =>
            setTodo((c) => ({ ...c, description: e.target.value }))
          }
          value={todo.description}
        />
      </div>
      <div className="flex flex-col w-28 gap-2">
        <StateButtons
          state={todo.state}
          setter={(state: TodoState) => setTodo((c) => ({ ...c, state }))}
        />
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            addTodo(todo)
              .then((res) => {
                if (res) todoDispatch({ type: "insert", value: res });
              })
              .then(() => setTodo(newPartialTodo))
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
