import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Todo } from "@/lib/model";
import { StateButtons } from "@/state-management/hookstate/stateButtons";
import Delete from "@/state-management/hookstate/delete";
import { State, useHookstate } from "@hookstate/core";

type ItemProps = { todo: State<Todo> };

export function Item(props: ItemProps) {
  const todo = useHookstate(props.todo);

  return (
    <div className="w-full max-w-[500px] flex flex-row gap-4 p-3 border-2 rounded-lg">
      <div className="flex flex-col justify-start w-full gap-3">
        <Label htmlFor={`todo-title-${todo.get().id}`}>Title</Label>
        <Input
          id={`todo-title-${todo.get().id}`}
          placeholder="Title"
          onChange={(e) => todo.merge({title: e.target.value })}
          value={todo.get().title}
        />
        <Label htmlFor={`todo-description-${todo.get().id}`}>Description</Label>
        <Input
          id={`todo-description-${todo.get().id}`}
          placeholder="Description..."
          onChange={(e) =>
            todo.merge({description: e.target.value })
          }
          value={todo.get().description ?? ""}
        />
        <Label htmlFor={`todo-created-${todo.get().id}`}>Created</Label>
        <Input
          id={`todo-created-${todo.get().id}`}
          placeholder="Created"
          readOnly={true}
          value={new Date(todo.get().created).toLocaleString("nl", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        />
      </div>
      <div className="flex flex-col justify-end w-28 gap-3">
        <StateButtons todo={todo}/>
        <Delete todo={todo} />
      </div>
    </div>
  );
}
