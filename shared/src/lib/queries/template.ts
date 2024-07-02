import { PartialTodo, Todo } from "@/lib/model";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";
import {AxiosError} from "axios";

export async function addTodo(todo: PartialTodo) {
  return await axiosInstance
    .post<Todo>("/new", {
      title: todo.title,
      description: todo.description,
      state: todo.state,
    })
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      toast.error(error["code"]);
      console.log(error);
    });
}

export async function deleteTodo(id: number) {
  await axiosInstance
    .delete<Todo>(`/delete?id=${id}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      toast.error(error["code"]);
      console.log(error);
    });
}

export async function updateTodo(todo: Todo) {
  await axiosInstance
    .put<Todo>(`/update?id=${todo.id}`, {
      title: todo.title,
      description: todo.description,
      state: todo.state,
    })
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      toast.error(error["code"]);
      console.log(error);
    });
}

export async function updateTodos(todos: Array<Todo>) {
  await axiosInstance
    .put(`/update`, todos)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      toast.error(error["code"]);
      console.log(error);
    });
}

export async function getAllTodos() {
  return await axiosInstance
    .get<Array<Todo>>(`/all`)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      toast.error(error["code"]);
      console.log(error);
    });
}
