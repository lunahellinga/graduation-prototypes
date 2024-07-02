import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Todo, TodoState } from "@/lib/model";
import { State } from "@/state-management/redux/state";
import Delete from "@/state-management/redux/delete";
import {useEffect, useState} from "react";

type ItemProps = {
  todos: Array<Todo>,
  setTodos: (todos: Array<Todo>) => void,
  index: number,
  setUpdated: (value: (((prevState: Array<Todo>) => Array<Todo>) | Array<Todo>)) => void
};

export function Item({ todos, setTodos, index, setUpdated }: ItemProps) {
  const [todo, setTodo] = useState(todos[index]);

  useEffect(() => {
    setUpdated(v => ([...v,todo]))
  }, [todo]);

  function setState(state: TodoState) {
    setTodo({ ...todo, state });
  }

  return (
    <div className="w-full max-w-[500px] flex flex-row gap-4 p-3 border-2 rounded-lg">
      <div className="flex flex-col justify-start w-full gap-3">
        <Label htmlFor={`todo-title-${todo.id}`}>Title</Label>
        <Input
          id={`todo-title-${todo.id}`}
          placeholder="Title"
          onChange={(e) => setTodo(v => ({ ...v, title: e.target.value }))}
          value={todo.title}
        />
        <Label htmlFor={`todo-description-${todo.id}`}>
          Description
        </Label>
        <Input
          id={`todo-description-${todo.id}`}
          placeholder="Description..."
          onChange={(e) =>
            setTodo(v => ({ ...v, description: e.target.value }))
          }
          value={todo.description ?? ""}
        />
        <Label htmlFor={`todo-created-${todo.id}`}>Created</Label>
        <Input
          id={`todo-created-${todo.id}`}
          placeholder="Created"
          readOnly={true}
          value={new Date(todo.created).toLocaleString("nl", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        />
      </div>
      <div className="flex flex-col justify-end w-28 gap-3">
        <State todo={todo} setState={setState} />
        <Delete id={todo.id} todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}
