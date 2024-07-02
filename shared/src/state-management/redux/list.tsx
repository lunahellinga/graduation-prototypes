import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTodo from "@/state-management/redux/add";
import AddManyTodosButton from "@/state-management/redux/add-many";
import AddConcurrentRemote from "@/state-management/redux/add-concurrent-remote";
import { Item } from "@/state-management/redux/item";
import { getAllTodos, updateTodos } from "@/lib/queries/template";
import { Button } from "@/components/ui/button";
import TodoPagination from "@/state-management/redux/pagination";
import AddConcurrentLocal from "@/state-management/redux/add-concurrent-local";
import { RootState } from "@/state-management/redux/store";
import {
  nextPage,
  previousPage,
  resetPage,
  setPageToLast,
  setPaginatedTodos,
} from "@/state-management/redux/pagination-slice";
import { setTodos } from "@/state-management/redux/todo-slice";
import { setLoading } from "@/state-management/redux/loading-slice";
import { useAppDispatch, useAppSelector } from "@/state-management/redux/hooks";

const List = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const { todos: paginatedTodos } = useAppSelector(
    (state: RootState) => state.pagination,
  );
  const loading = useAppSelector((state: RootState) => state.loading);

  useEffect(() => {
    if (loading) {
      getAllTodos()
        .then((r) => {
          if (r) {
            dispatch(setTodos(r));
            dispatch(setPaginatedTodos(r));
          }
        })
        .finally(() => dispatch(setLoading(false)));
    }
  }, [loading, dispatch]);

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handlePreviousPage = () => {
    dispatch(previousPage());
  };

  const handleResetPage = () => {
    dispatch(resetPage());
  };

  const handleSetPageToTotalLength = () => {
    dispatch(setPageToLast());
  };

  return (
    <div className="flex flex-col items-center ">
      {/*<Card className="max-w-[1066px] m-10">*/}
      {/*  <CardHeader className="w-full flex flex-col items-center gap-4 pb-4 border-b-2 mb-4">*/}
      {/*    <CardTitle className="text-">To-Do List</CardTitle>*/}
      {/*    <div className="flex gap-4 items-start">*/}
      {/*      <AddTodo todos={todos} setTodos={setTodosList} />*/}
      {/*      <div className="w-full flex flex-col justify-center gap-4">*/}
      {/*        <AddManyTodosButton todos={todos} setTodos={setTodosList} />*/}
      {/*        <AddConcurrentRemote todos={todos} setTodos={setTodosList} />*/}
      {/*        <AddConcurrentLocal todos={todos} setTodos={setTodosList} />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </CardHeader>*/}
      {/*  <CardContent>*/}
      {/*    {loading ? (*/}
      {/*      <p>Loading...</p>*/}
      {/*    ) : (*/}
      {/*      <>*/}
      {/*        <div className="w-full flex flex-row flex-wrap items-center  gap-4">*/}
      {/*          {todos*/}
      {/*            .slice((currentPage - 1) * 10, currentPage * 10)*/}
      {/*            .map((todo, index) => (*/}
      {/*              <Item*/}
      {/*                key={todo.id}*/}
      {/*                index={(currentPage - 1) * 10 + index}*/}
      {/*                todos={todos}*/}
      {/*                setTodos={setTodosList}*/}
      {/*                setUpdated={updateTodos}*/}
      {/*              />*/}
      {/*            ))}*/}
      {/*        </div>*/}
      {/*        <TodoPagination*/}
      {/*          setCurrentPage={handleSetPage}*/}
      {/*          currentPage={currentPage}*/}
      {/*          paginationPages={paginationPages}*/}
      {/*        />*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*  </CardContent>*/}
      {/*  <CardFooter className="w-full flex justify-center">*/}
      {/*    <Button*/}
      {/*      disabled={loading}*/}
      {/*      onClick={() => {*/}
      {/*        dispatch(setLoading(true));*/}
      {/*        dispatch(updateTodos(todos)).finally(() =>*/}
      {/*          dispatch(setLoading(false)),*/}
      {/*        );*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      Save Changes*/}
      {/*    </Button>*/}
      {/*  </CardFooter>*/}
      {/*</Card>*/}
    </div>
  );
};

export default List;
