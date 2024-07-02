import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PartialTodo, Todo, TodoState } from "@/lib/model";
import { addTodo } from "@/lib/queries/template";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StateButtons } from "@/state-management/zustand/stateButtons";
import { useHookstate } from "@hookstate/core";
import {newPartialTodo} from "@/lib/utils";
import {globalTodos} from "@/state-management/hookstate/list";

const AddTodo = () => {
  const todos = useHookstate(globalTodos)
  const todo = useHookstate<PartialTodo>(newPartialTodo);
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-screen-md flex flex-row gap-4 p-3 border-2 rounded-lg">
      <div className="flex flex-col justify-start w-80 gap-4">
        <Label htmlFor={`new-todo-title`}>Title</Label>
        <Input
          id={`new-todo-title`}
          placeholder="Title"
          onChange={(e) => todo.merge({ title: e.target.value })}
          value={todo.get().title}
        />
        <Label htmlFor={`new-todo-description`}>Description</Label>
        <Input
          id={`new-todo-description`}
          placeholder="Description..."
          onChange={(e) => todo.merge({ description: e.target.value })}
          value={todo.get().description}
        />
      </div>
      <div className="flex flex-col w-28 gap-2">
        <StateButtons todo={todo} />
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            addTodo(todo.get())
              .then((res) => {
                if (res) todos.merge([res]);
              })
              .then(() => todo.set(newPartialTodo))
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
