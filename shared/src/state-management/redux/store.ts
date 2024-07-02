import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "@/state-management/redux/todo-slice";
import { paginationReducer } from "@/state-management/redux/pagination-slice";
import {loadingReducer} from "@/state-management/redux/loading-slice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    pagination: paginationReducer,
    loading: loadingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
