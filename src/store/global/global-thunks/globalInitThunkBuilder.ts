import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { GlobalState } from "../global-state";
import { categoryManagerActions } from "../../categoryManager/categoryManager.actions";
import { userThunkActions } from "../../user/user.thunk-builder";
import { contactThunkActions } from "../../contact/contact.thunk-builder";

export const globalInitThunk = createAsyncThunk(
  "global/globalInitThunk",
  async (_, thunkApi) => {
    await thunkApi.dispatch(
      categoryManagerActions.initializeCategoryManagerThunk()
    );

    await thunkApi.dispatch(userThunkActions.getUsersThunk());

    await thunkApi.dispatch(contactThunkActions.getContactsThunk());
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
