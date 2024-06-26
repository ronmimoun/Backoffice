import { createSlice, Reducer } from "@reduxjs/toolkit";
import { GlobalState } from "./global-state";
import { globalThunkActionBuilder } from "./global.thunk-builder";

const initialState: GlobalState = {
  loaderCount: 0,
  error: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    incrementLoaderCount: (state) => {
      state.loaderCount++;
    },
    decrementLoaderCount: (state) => {
      state.loaderCount--;
    },
    resetLoaderCount: (state) => {
      state.loaderCount = 0;
    },
    clearState: () => initialState,
  },
  extraReducers: globalThunkActionBuilder,
});

export const globalInitialState = initialState;
export const { incrementLoaderCount, decrementLoaderCount } =
  globalSlice.actions;

const globalReducer: Reducer<GlobalState> = globalSlice.reducer;
export default globalReducer;
