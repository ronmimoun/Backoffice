import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { userApiService } from "../../../services/api/user.api.service";
import { ApiResponse } from "../../../models/base/api-base";
import { RemoveUserRequest } from "../../../models/user/remove/removeUser.request";

export const removeUserThunk = createAsyncThunk(
  "user/removeUser",
  async (data: RemoveUserRequest): Promise<ApiResponse<string>> => {
    const response = await userApiService.remove(data);
    return response;
  }
);

export const removeUserThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(
      removeUserThunk.fulfilled,
      (state, action: PayloadAction<ApiResponse<string>>) => {
        if (!action.payload.isSucceeded || !action.payload.data) return;

        state.users = state.users.filter(
          (user) => user._id !== action.payload.data?.content
        );
      }
    )
    .addCase(removeUserThunk.rejected, () => {});
};
