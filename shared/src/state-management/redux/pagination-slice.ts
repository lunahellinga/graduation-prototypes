import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Todo} from "@/lib/model";

type PaginationState = {
  currentPage: number;
  maxPage: number
  todos: Todo[];
};

const initialState: PaginationState = {
  currentPage: 1,
  maxPage: 1,
  todos: [],
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    nextPage(state) {
      state.currentPage += 1;
    },
    previousPage(state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    resetPage(state) {
      state.currentPage = 1;
    },
    setPageToLast(state) {
      state.currentPage = state.maxPage
    },
    setPaginatedTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
  },
});

export const {
  setPage,
  nextPage,
  previousPage,
  resetPage,
  setPageToLast,
  setPaginatedTodos,
} = paginationSlice.actions;

export const paginationReducer = paginationSlice.reducer;
