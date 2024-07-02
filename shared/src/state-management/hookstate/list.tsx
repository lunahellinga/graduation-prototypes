import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTodo from "@/state-management/hookstate/add";
import AddManyTodosButton from "@/state-management/hookstate/add-many";
import AddConcurrentRemote from "@/state-management/hookstate/add-concurrent-remote";
import { Todo } from "@/lib/model";
import { Item } from "@/state-management/hookstate/item";
import { getAllTodos } from "@/lib/queries/template";
import { Button } from "@/components/ui/button";
import TodoPagination from "@/state-management/hookstate/pagination";
import AddConcurrentLocal from "@/state-management/hookstate/add-concurrent-local";
import { hookstate, useHookstate } from "@hookstate/core";
import { updateTodos } from "@/state-management/hookstate/queries";

export const globalTodos = hookstate<Array<Todo>>([] as Array<Todo>);

const List = () => {
  const todos = useHookstate(globalTodos);
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
          if (res) todos.set(res);
        })
        .then(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    pagination.merge({
      pages: [...Array(Math.ceil(todos.length / 10)).keys()].map((k) => k + 1),
    });
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
                    (pagination.current.get() - 1) * 10,
                    pagination.current.get() * 10,
                  )
                  .map((todo) => (
                    <Item key={todo.get().id} todo={todo} />
                  ))}
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
              updateTodos(todos.get()).finally(() => setSaving(false));
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
