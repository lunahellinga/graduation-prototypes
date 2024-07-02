import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Todo, TodoState } from "@/lib/model";
import { StateButtons } from "@/state-management/recoil/stateButtons";
import Delete from "@/state-management/recoil/delete";
import { State, useHookstate } from "@hookstate/core";
import { useRecoilState } from "recoil";
import { todoListAtom } from "@/state-management/recoil/atoms";
import { replaceItemAtIndex } from "@/lib/utils";

type ItemProps = { todo: Todo };

export function Item({ todo }: ItemProps) {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const index = todoList.findIndex((listItem) => listItem.id === todo.id);

  return (
    <div className="w-full max-w-[500px] flex flex-row gap-4 p-3 border-2 rounded-lg">
      <div className="flex flex-col justify-start w-full gap-3">
        <Label htmlFor={`todo-title-${todo.id}`}>Title</Label>
        <Input
          id={`todo-title-${todo.id}`}
          placeholder="Title"
          onChange={(e) =>
            setTodoList(
              replaceItemAtIndex(todoList, index, {
                ...todo,
                title: e.target.value,
              }),
            )
          }
          value={todo.title}
        />
        <Label htmlFor={`todo-description-${todo.id}`}>Description</Label>
        <Input
          id={`todo-description-${todo.id}`}
          placeholder="Description..."
          onChange={(e) =>
            setTodoList(
              replaceItemAtIndex(todoList, index, {
                ...todo,
                description: e.target.value,
              }),
            )
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
          setter={(state: TodoState) =>
            setTodoList(
              replaceItemAtIndex(todoList, index, {
                ...todo,
                state,
              }),
            )
          }
        />
        <Delete todo={todo} />
      </div>
    </div>
  );
}
