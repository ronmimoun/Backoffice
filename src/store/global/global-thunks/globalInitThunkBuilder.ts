import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { GlobalState } from "../global-state";
import { categoryManagerActions } from "../../categoryManager/categoryManager.actions";
import { contactActions } from "../../contact/contact.actions";

export const globalInitThunk = createAsyncThunk(
  "global/globalInitThunk",
  async (_, thunkApi) => {
    await thunkApi.dispatch(
      categoryManagerActions.initializeCategoryManagerThunk()
    );

    await thunkApi.dispatch(contactActions.getContactsThunk());
  }
);

export const globalInitThunkBuilder = (
  builder: ActionReducerMapBuilder<GlobalState>
) => {
  builder
    .addCase(globalInitThunk.pending, () => {})
    .addCase(globalInitThunk.fulfilled, () => {})
    .addCase(globalInitThunk.rejected, () => {});
};
