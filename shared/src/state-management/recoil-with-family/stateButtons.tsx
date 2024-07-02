import { Button } from "@/components/ui/button";
import {
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
} from "lucide-react";
import { PartialTodo, Todo, TodoState } from "@/lib/model";
import { RecoilState, useRecoilState } from "recoil";

type StateProps = { atom: RecoilState<Todo | PartialTodo> };

export function StateButtons({ atom }: StateProps) {
  const [todo, setTodo] = useRecoilState(atom);

  return (
    <div className="flex flex-wrap w-28 h-28 gap-2 p-2 border-2 rounded-lg">
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setTodo((c) => ({ ...c, state: TodoState.todo }))}
      >
        <Clipboard
          size={28}
          color={todo.state === TodoState.todo ? "darkgreen" : "darkgray"}
        />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setTodo((c) => ({ ...c, state: TodoState.doing }))}
      >
        <ClipboardList
          size={28}
          color={todo.state === TodoState.doing ? "darkgreen" : "darkgray"}
        />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setTodo((c) => ({ ...c, state: TodoState.done }))}
      >
        <ClipboardCheck
          size={28}
          color={todo.state === TodoState.done ? "darkgreen" : "darkgray"}
        />
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="w-10 h-10 p-1"
        onClick={() => setTodo((c) => ({ ...c, state: TodoState.cancelled }))}
      >
        <ClipboardX
          size={28}
          color={todo.state === TodoState.cancelled ? "darkgreen" : "darkgray"}
        />
      </Button>
    </div>
  );
}
