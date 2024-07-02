import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Todo } from "@/lib/model";
import { StateButtons } from "@/state-management/zustand/stateButtons";
import Delete from "@/state-management/zustand/delete";
import { State, useHookstate } from "@hookstate/core";
import {useTodoStore} from "@/state-management/zustand/store";
import {useRef} from "react";

type ItemProps = { todo: Todo};

export function Item({todo}: ItemProps) {
  const todoRef = useRef(useTodoStore.getState().todos)
  const todoStore = useTodoStore()

  return (
    <div className="w-full max-w-[500px] flex flex-row gap-4 p-3 border-2 rounded-lg">
      {/*<div className="flex flex-col justify-start w-full gap-3">*/}
      {/*  <Label htmlFor={`todo-title-${todo.id}`}>Title</Label>*/}
      {/*  <Input*/}
      {/*    id={`todo-title-${todo.id}`}*/}
      {/*    placeholder="Title"*/}
      {/*    onChange={(e) => todoStore.update({title: e.target.value })}*/}
      {/*    value={todo.title}*/}
      {/*  />*/}
      {/*  <Label htmlFor={`todo-description-${todo.id}`}>Description</Label>*/}
      {/*  <Input*/}
      {/*    id={`todo-description-${todo.id}`}*/}
      {/*    placeholder="Description..."*/}
      {/*    onChange={(e) =>*/}
      {/*      todo.merge({description: e.target.value })*/}
      {/*    }*/}
      {/*    value={todo.get().description ?? ""}*/}
      {/*  />*/}
      {/*  <Label htmlFor={`todo-created-${todo.id}`}>Created</Label>*/}
      {/*  <Input*/}
      {/*    id={`todo-created-${todo.id}`}*/}
      {/*    placeholder="Created"*/}
      {/*    readOnly={true}*/}
      {/*    value={new Date(todo.get().created).toLocaleString("nl", {*/}
      {/*      dateStyle: "medium",*/}
      {/*      timeStyle: "short",*/}
      {/*    })}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="flex flex-col justify-end w-28 gap-3">*/}
      {/*  <StateButtons todo={todo}/>*/}
      {/*  <Delete todo={todo} />*/}
      {/*</div>*/}
    </div>
  );
}
