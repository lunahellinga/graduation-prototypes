import {Button} from "@/components/ui/button";
import {Clipboard, ClipboardCheck, ClipboardList, ClipboardX,} from "lucide-react";
import {PartialTodo, TodoState} from "@/lib/model";

type StateProps = { todo: PartialTodo; setState: (state: TodoState) => void };

export function State({ todo, setState }: StateProps) {
  return (
    <div className="flex flex-wrap w-28 h-28 gap-2 p-2 border-2 rounded-lg">
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setState(TodoState.todo)}
      >
        <Clipboard size={28} color={todo.state=== TodoState.todo ? "darkgreen" : "darkgray" } />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setState(TodoState.doing)}
      >
        <ClipboardList size={28} color={todo.state=== TodoState.doing ? "darkgreen" : "darkgray" } />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setState(TodoState.done)}
      >
        <ClipboardCheck size={28} color={todo.state=== TodoState.done ? "darkgreen" : "darkgray" } />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setState(TodoState.cancelled)}
      >
        <ClipboardX size={28} color={todo.state=== TodoState.cancelled ? "darkgreen" : "darkgray" } />
      </Button>
    </div>
  );
}
