import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTodo from "@/components/template/add";
import AddManyTodosButton from "@/components/template/add-many";
import AddConcurrentRemote from "@/components/template/add-concurrent-remote";
import { Todo } from "@/lib/model";
import { Item } from "@/components/template/item";
import { getAllTodos, updateTodos } from "@/lib/queries/template";
import { Button } from "@/components/ui/button";
import TodoPagination from "@/components/template/pagination";
import AddConcurrentLocal from "@/components/template/add-concurrent-local";

function resolveUpdates(
  todos: Array<Todo>,
  updated: Array<Todo>,
  setTodos: (todos: Array<Todo>) => void,
  setUpdated: (updated: Array<Todo>) => void,
) {
  const newTodos = [...todos];
  updated.forEach((updated) => {
    const index = todos.findIndex((todo) => todo.id === updated.id);
    newTodos[index] = updated;
  });
  setTodos(newTodos);
  setUpdated([]);
}

const List = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [updated, setUpdated] = useState<Array<Todo>>([]);

  useEffect(() => {
    if (loading) {
      getAllTodos()
        .then((r) => {
          if (r) setTodos(r);
        })
        .then(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    resolveUpdates(todos,updated,setTodos,setUpdated);
  }, [currentPage]);

  const paginationPages = useMemo(() => {
    return [...Array(Math.ceil(todos.length / 10)).keys()].map((k) => k + 1);
  }, [todos.length]);

  return (
    <div className="flex flex-col items-center ">
      <Card className="max-w-[1066px] m-10">
        <CardHeader className="w-full flex flex-col items-center gap-4 pb-4 border-b-2 mb-4">
          <CardTitle className="text-">To-Do List</CardTitle>
          <div className="flex gap-4 items-start">
            <AddTodo todos={todos} setTodos={setTodos} />
            <div className="w-full flex flex-col justify-center gap-4">
              <AddManyTodosButton todos={todos} setTodos={setTodos} />
              <AddConcurrentRemote setTodos={setTodos} />
              <AddConcurrentLocal todos={todos} setTodos={setTodos} />
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
                  .slice((currentPage - 1) * 10, currentPage * 10)
                  .map((todo, index) => (
                    <Item
                      key={todo.id}
                      index={(currentPage - 1) * 10 + index}
                      todos={todos}
                      setTodos={setTodos}
                      setUpdated={setUpdated}
                      
                    />
                  ))}
              </div>
              <TodoPagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                paginationPages={paginationPages}
              />
            </>
          )}
        </CardContent>
        <CardFooter className="w-full flex justify-center">
          <Button
            disabled={loading}
            onClick={() => {
              setLoading(true)
              resolveUpdates(todos, updated, setTodos, setUpdated);
              updateTodos(todos).finally(() => setLoading(false));
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
