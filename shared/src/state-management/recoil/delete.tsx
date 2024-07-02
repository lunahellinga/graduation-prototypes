import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/lib/queries/template";
import { Todo } from "@/lib/model";
import { useRecoilState } from "recoil";
import { todoListAtom } from "@/state-management/recoil/atoms";
import { removeItemAtIndex } from "@/lib/utils";

type DeleteTodoProps = {
  todo: Todo;
};

const DeleteTodo = ({ todo }: DeleteTodoProps) => {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const index = todoList.findIndex((listItem) => listItem.id === todo.id);

  return (
    <Button
      onClick={() => {
        deleteTodo(todo.id).then(() => {
          setTodoList(removeItemAtIndex(todoList, index));
        });
      }}
    >
      Delete Todo
    </Button>
  );
};

export default DeleteTodo;
