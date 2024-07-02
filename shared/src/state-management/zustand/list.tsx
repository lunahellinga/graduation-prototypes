import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTodo from "@/state-management/zustand/add";
import AddManyTodosButton from "@/state-management/zustand/add-many";
import AddConcurrentRemote from "@/state-management/zustand/add-concurrent-remote";
import { Item } from "@/state-management/zustand/item";
import {getAllTodos, updateTodos} from "@/lib/queries/template";
import { Button } from "@/components/ui/button";
import TodoPagination from "@/state-management/zustand/pagination";
import AddConcurrentLocal from "@/state-management/zustand/add-concurrent-local";
import { useHookstate } from "@hookstate/core";
import {useTodoStore} from "@/state-management/zustand/store";

const List = () => {
  const todoStore = useTodoStore();
  const pagination = useHookstate<{ current: number; pages: Array<number> }>({
    current: 1,
    pages: [1],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      getAllTodos()
        .then((res) => {
          if (res) todoStore.set(res);
        })
        .then(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    pagination.merge({
      pages: [...Array(Math.ceil(todoStore.todos.length / 10)).keys()].map((k) => k + 1),
    });
  }, [todoStore.todos.length]);

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
                {/*{todoStore.todos*/}
                {/*  .slice(*/}
                {/*    (pagination.current.get() - 1) * 10,*/}
                {/*    pagination.current.get() * 10,*/}
                {/*  )*/}
                {/*  .map((todo) => (*/}
                {/*    <Item key={todo.id} todo={todo.id} />*/}
                {/*  ))}*/}
              </div>
              <TodoPagination pagination={pagination} />
            </>
          )}
        </CardContent>
        <CardFooter className="w-full flex justify-center">
          <Button
            disabled={saving}
            onClick={() => {
              setSaving(true);
              updateTodos(todoStore.todos).finally(() => setSaving(false));
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
