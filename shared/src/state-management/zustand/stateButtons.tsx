import { Button } from "@/components/ui/button";
import {
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
} from "lucide-react";
import { PartialTodo, Todo, TodoState } from "@/lib/model";
import { State } from "@hookstate/core";

type StateProps = { todo: State<PartialTodo> | State<Todo> };

export function StateButtons({ todo }: StateProps) {
  return (
    <div className="flex flex-wrap w-28 h-28 gap-2 p-2 border-2 rounded-lg">
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => todo.merge({ state: TodoState.todo })}
      >
        <Clipboard
          size={28}
          color={todo.get().state === TodoState.todo ? "darkgreen" : "darkgray"}
        />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => todo.merge({ state: TodoState.doing })}
      >
        <ClipboardList
          size={28}
          color={
            todo.get().state === TodoState.doing ? "darkgreen" : "darkgray"
          }
        />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => todo.merge({ state: TodoState.done })}
      >
        <ClipboardCheck
          size={28}
          color={todo.get().state === TodoState.done ? "darkgreen" : "darkgray"}
        />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => todo.merge({ state: TodoState.cancelled })}
      >
        <ClipboardX
          size={28}
          color={
            todo.get().state === TodoState.cancelled ? "darkgreen" : "darkgray"
          }
        />
      </Button>
    </div>
  );
}
