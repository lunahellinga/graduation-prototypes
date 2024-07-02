import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Todo, TodoState } from "@/lib/model";
import { StateButtons } from "@/state-management/jotai/stateButtons";
import { PrimitiveAtom, useAtom } from "jotai";
import { deleteTodo } from "@/lib/queries/template";
import { Button } from "@/components/ui/button";

type ItemProps = { atom: PrimitiveAtom<Todo>; remove: () => void };

export function Item({ atom, remove }: ItemProps) {
  const [todo, setTodo] = useAtom(atom);

  return (
    <div className="w-full max-w-[500px] flex flex-row gap-4 p-3 border-2 rounded-lg">
      <div className="flex flex-col justify-start w-full gap-3">
        <Label htmlFor={`todo-title-${todo.id}`}>Title</Label>
        <Input
          id={`todo-title-${todo.id}`}
          placeholder="Title"
          onChange={(e) =>
            setTodo((c) => ({
              ...c,
              title: e.target.value,
            }))
          }
          value={todo.title}
        />
        <Label htmlFor={`todo-description-${todo.id}`}>Description</Label>
        <Input
          id={`todo-description-${todo.id}`}
          placeholder="Description..."
          onChange={(e) =>
            setTodo((c) => ({
              ...c,
              description: e.target.value,
            }))
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
        <StateButtons
          state={todo.state}
          setter={(state: TodoState) => ({ ...todo, state: state })}
        />
        <Button
          onClick={() => {
            deleteTodo(todo.id).then(() => remove());
          }}
        >
          Delete Todo
        </Button>
      </div>
    </div>
  );
}
