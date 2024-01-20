import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { userApiService } from "../../../services/api/user.api.service";
import { ApiResponse } from "../../../models/base/api-base";
import { GetUserResponse } from "../../../models/user/get-users/getUsers.response";

export const getUsersThunk = createAsyncThunk("user/getUsers", async () => {
  const response = await userApiService.getUsers();
  return response;
});

export const getUsersThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(getUsersThunk.pending, () => {})
    .addCase(
      getUsersThunk.fulfilled,
      (state, action: PayloadAction<ApiResponse<GetUserResponse>>) => {
        if (!action.payload.isSucceeded || !action.payload.data) return;
        state.users = action.payload.data?.content;
      }
    )
    .addCase(getUsersThunk.rejected, () => {});
};
