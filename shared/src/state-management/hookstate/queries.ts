import {Todo} from "@/lib/model";
import {axiosInstance} from "@/lib/axios";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import {Immutable} from "@hookstate/core";

export async function updateTodos(todos: Immutable<Array<Todo>>) {
  await axiosInstance
    .put(`/update`, todos)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      toast.error(error["code"]);
      console.log(error);
    });
}