import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StateButtons } from "@/state-management/recoil-with-family/stateButtons";
import Delete from "@/state-management/recoil-with-family/delete";
import { useRecoilState } from "recoil";
import { todoAtom } from "@/state-management/recoil-with-family/atoms";

type ItemProps = { todoId: number };

export function Item({ todoId }: ItemProps) {
  const [todo, setTodo] = useRecoilState(todoAtom(todoId));

  return (
    <div className="w-full max-w-[500px] flex flex-row gap-4 p-3 border-2 rounded-lg">
      <div className="flex flex-col justify-start w-full gap-3">
        <Label htmlFor={`todo-title-${todoId}`}>Title</Label>
        <Input
          id={`todo-title-${todoId}`}
          placeholder="Title"
          onChange={(e) => setTodo((c) => ({ ...c, title: e.target.value }))}
          value={todo.title}
        />
        <Label htmlFor={`todo-description-${todoId}`}>Description</Label>
        <Input
          id={`todo-description-${todoId}`}
          placeholder="Description..."
          onChange={(e) =>
            setTodo((c) => ({ ...c, description: e.target.value }))
          }
          value={todo.description ?? ""}
        />
        <Label htmlFor={`todo-created-${todoId}`}>Created</Label>
        <Input
          id={`todo-created-${todoId}`}
          placeholder="Created"
          readOnly={true}
          value={new Date(todo.created).toLocaleString("nl", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        />
      </div>
      <div className="flex flex-col justify-end w-28 gap-3">
        {/*@ts-ignore*/}
        <StateButtons atom={todoAtom(todoId)} />
        <Delete todoId={todoId} />
      </div>
    </div>
  );
}
