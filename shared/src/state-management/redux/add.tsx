import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PartialTodo, Todo, TodoState } from "@/lib/model";
import { addTodo } from "@/lib/queries/template";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { State } from "@/state-management/redux/state";
import { useAppDispatch, useAppSelector } from "@/state-management/redux/hooks";
import { RootState } from "@/state-management/redux/store";
import { setLoading } from "@/state-management/redux/loading-slice";
import {newPartialTodo} from "@/lib/utils";

const AddTodo = () => {
  const [todo, setTodo] = useState<PartialTodo>(newPartialTodo);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.loading);
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
            dispatch(setLoading(true));
            addTodo(todo)
              .then((res) => {
                if (res) addTodo(res);
              })
              .then(() => setTodo(newPartialTodo))
              .finally(() => dispatch(setLoading(false)));
          }}
        >
          Add Todo
        </Button>
      </div>
    </div>
  );
};

export default AddTodo;
