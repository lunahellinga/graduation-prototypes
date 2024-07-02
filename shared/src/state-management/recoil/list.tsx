import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTodo from "@/state-management/recoil/add";
import AddManyTodosButton from "@/state-management/recoil/add-many";
import AddConcurrentRemote from "@/state-management/recoil/add-concurrent-remote";
import { Item } from "@/state-management/recoil/item";
import {getAllTodos, updateTodos} from "@/lib/queries/template";
import { Button } from "@/components/ui/button";
import TodoPagination from "@/state-management/recoil/pagination";
import AddConcurrentLocal from "@/state-management/recoil/add-concurrent-local";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {currentPageAtom, pagesAtom, todoListAtom} from "@/state-management/recoil/atoms";

const List = () => {
  const [todos, setTodos] = useRecoilState(todoListAtom);
  const currentPage = useRecoilValue(currentPageAtom)
  const setPages = useSetRecoilState(pagesAtom)

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      getAllTodos()
        .then((res) => {
          if (res)  setTodos(res);
        })
        .then(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    setPages([...Array(Math.ceil(todos.length / 10)).keys()].map((k) => k + 1));
  }, [todos.length]);

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
                {todos
                  .slice(
                    (currentPage - 1) * 10,
                    currentPage * 10,
                  )
                  .map((todo) => (
                    <Item key={todo.id} todo={todo} />
                  ))}
              </div>
              <TodoPagination />
            </>
          )}
        </CardContent>
        <CardFooter className="w-full flex justify-center">
          <Button
            disabled={saving}
            onClick={() => {
              setSaving(true);
              updateTodos(todos).finally(() => setSaving(false));
            }}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default List;
