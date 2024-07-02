import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoadingState = boolean;

const initialState: LoadingState = false;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
