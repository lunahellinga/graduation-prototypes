import {Button} from "@/components/ui/button";
import {deleteTodo} from "@/lib/queries/template";
import {Todo} from "@/lib/model";

type DeleteTodoProps = {
  id: number,
  todos:Array<Todo>,
  setTodos: (todos: Array<Todo>) => void
}

const DeleteTodo = ({ id, todos, setTodos }: DeleteTodoProps) => {
  return (
    <Button
      onClick={() => {
        deleteTodo(id).then(() => {
          const removeIndex = todos.findIndex(t => t.id === id)
          const newTodos = [...todos]
          newTodos.splice(removeIndex,1)
          setTodos(newTodos)
        });
      }}
    >
      Delete Todo
    </Button>
  );
};

export default DeleteTodo;
