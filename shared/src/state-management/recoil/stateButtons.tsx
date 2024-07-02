import { Button } from "@/components/ui/button";
import {
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
} from "lucide-react";
import { PartialTodo, Todo, TodoState } from "@/lib/model";
import { State } from "@hookstate/core";

type StateProps = { state: TodoState; setter: (state: TodoState) => void };

export function StateButtons({ state, setter }: StateProps) {
  return (
    <div className="flex flex-wrap w-28 h-28 gap-2 p-2 border-2 rounded-lg">
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setter(TodoState.todo)}
      >
        <Clipboard
          size={28}
          color={state === TodoState.todo ? "darkgreen" : "darkgray"}
        />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setter(TodoState.doing)}
      >
        <ClipboardList
          size={28}
          color={state === TodoState.doing ? "darkgreen" : "darkgray"}
        />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setter(TodoState.done)}
      >
        <ClipboardCheck
          size={28}
          color={state === TodoState.done ? "darkgreen" : "darkgray"}
        />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setter(TodoState.cancelled)}
      >
        <ClipboardX
          size={28}
          color={state === TodoState.cancelled ? "darkgreen" : "darkgray"}
        />
      </Button>
    </div>
  );
}
