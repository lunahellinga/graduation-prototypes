import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTodo from "@/state-management/recoil-with-family/add";
import AddManyTodosButton from "@/state-management/recoil-with-family/add-many";
import AddConcurrentRemote from "@/state-management/recoil-with-family/add-concurrent-remote";
import { Item } from "@/state-management/recoil-with-family/item";
import { getAllTodos } from "@/lib/queries/template";
import TodoPagination from "@/state-management/recoil-with-family/pagination";
import AddConcurrentLocal from "@/state-management/recoil-with-family/add-concurrent-local";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPageAtom,
  pagesAtom,
  todoIdsAtom,
  useSetTodos,
} from "@/state-management/recoil-with-family/atoms";
import { Save } from "@/state-management/recoil-with-family/save";

const List = () => {
  const todoIds = useRecoilValue(todoIdsAtom);
  const setTodos = useSetTodos();
  const currentPage = useRecoilValue(currentPageAtom);
  const setPages = useSetRecoilState(pagesAtom);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      getAllTodos()
        .then((res) => {
          if (res) setTodos(res);
        })
        .then(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    setPages(
      [...Array(Math.ceil(todoIds.length / 10)).keys()].map((k) => k + 1),
    );
  }, [todoIds.length]);

  return (
    <div className="flex flex-col items-center ">
      <Card className="max-w-[1066px] m-10">
        <CardHeader className="w-full flex flex-col items-center gap-4 pb-4 border-b-2 mb-4">
          <CardTitle className="text-">To-Do List</CardTitle>
          <div className="flex gap-4 items-start">
            <AddTodo />
            <div className="w-full flex flex-col justify-center gap-4">
              <AddManyTodosButton />
              <AddConcurrentRemote />
              <AddConcurrentLocal />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="w-full flex flex-row flex-wrap items-center  gap-4">
                {todoIds
                  .slice((currentPage - 1) * 10, currentPage * 10)
                  .map((todoId) => (
                    <Item key={todoId} todoId={todoId} />
                  ))}
              </div>
              <TodoPagination />
            </>
          )}
        </CardContent>
        <CardFooter className="w-full flex justify-center">
          <Save />
        </CardFooter>
      </Card>
    </div>
  );
};

export default List;
