import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/lib/queries/template";
import { PartialTodo, Todo } from "@/lib/model";
import { none, State, useHookstate } from "@hookstate/core";
import { globalTodos } from "@/state-management/hookstate/list";

type DeleteTodoProps = {
  todo: State<Todo>;
};

const DeleteTodo = ({ todo }: DeleteTodoProps) => {
  const todos = useHookstate(globalTodos);

  return (
    <Button
      onClick={() => {
        deleteTodo(todo.get().id).then(() => {
          const removeIndex = todos.findIndex(
            (t) => t.get().id === todo.get().id,
          );
          todos.merge({ [removeIndex]: none });
        });
      }}
    >
      Delete Todo
    </Button>
  );
};

export default DeleteTodo;
