import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTodo from "@/state-management/jotai/add";
import AddManyTodosButton from "@/state-management/jotai/add-many";
import AddConcurrentRemote from "@/state-management/jotai/add-concurrent-remote";
import { Item } from "@/state-management/jotai/item";
import { getAllTodos } from "@/lib/queries/template";
import TodoPagination from "@/state-management/jotai/pagination";
import AddConcurrentLocal from "@/state-management/jotai/add-concurrent-local";
import {
  currentPageAtom,
  pagesAtom,
  todoListSplitAtom,
  todoListAtom,
  maxIdAtom,
} from "@/state-management/jotai/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Save } from "@/state-management/jotai/save";

const List = () => {
  const setTodoList = useSetAtom(todoListAtom);
  const [todoAtoms, dispatch] = useAtom(todoListSplitAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const setPages = useSetAtom(pagesAtom);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      getAllTodos()
        .then((res) => {
          if (res) setTodoList(res);
        })
        .then(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    setPages(
      [...Array(Math.ceil(todoAtoms.length / 10)).keys()].map((k) => k + 1),
    );
  }, [todoAtoms.length]);

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
                {todoAtoms
                  .slice((currentPage - 1) * 10, currentPage * 10)
                  .map((todoAtom) => (
                    <Item
                      key={`${todoAtom}`}
                      remove={() =>
                        dispatch({ type: "remove", atom: todoAtom })
                      }
                      atom={todoAtom}
                    />
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
