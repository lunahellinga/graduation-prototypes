import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PartialTodo, Todo, TodoState } from "@/lib/model";
import { addTodo } from "@/lib/queries/template";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { State } from "@/components/template/state";
import {newPartialTodo} from "@/lib/utils";

type AddTodoProps = {
  todos: Array<Todo>;
  setTodos: (todos: Array<Todo>) => void;
};


const AddTodo = ({ todos, setTodos }: AddTodoProps) => {
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState<PartialTodo>(newPartialTodo);

  function setState(state: TodoState) {
    setTodo({ ...todo, state });
  }

  return (
    <div className="max-w-screen-md flex flex-row gap-4 p-3 border-2 rounded-lg">
      <div className="flex flex-col justify-start w-80 gap-4">
        <Label htmlFor={`new-todo-title`}>Title</Label>
        <Input
          id={`new-todo-title`}
          placeholder="Title"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          value={todo.title}
        />
        <Label htmlFor={`new-todo-description`}>Description</Label>
        <Input
          id={`new-todo-description`}
          placeholder="Description..."
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          value={todo.description}
        />
      </div>
      <div className="flex flex-col w-28 gap-2">
        <State todo={todo} setState={setState} />
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            addTodo(todo)
              .then((r) => {
                if (r) setTodos([...todos, r]);
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
