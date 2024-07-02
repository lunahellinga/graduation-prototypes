import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/lib/queries/template";
import { useRemoveTodo } from "@/state-management/recoil-with-family/atoms";

type DeleteTodoProps = {
  todoId: number;
};

const DeleteTodo = ({ todoId }: DeleteTodoProps) => {
  const remove = useRemoveTodo();

  return (
    <Button
      onClick={() => {
        deleteTodo(todoId).then(() => {
          remove(todoId);
        });
      }}
    >
      Delete Todo
    </Button>
  );
};

export default DeleteTodo;
