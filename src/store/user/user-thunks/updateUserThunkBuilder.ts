import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { userApiService } from "../../../services/api/user.api.service";
import { ApiResponse } from "../../../models/base/api-base";
import { UpdateUserResponse } from "../../../models/user/update-user/updateUser.response";
import { UpdateUserRequest } from "../../../models/user/update-user/updateUser.request";

export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async (data: UpdateUserRequest): Promise<ApiResponse<UpdateUserResponse>> => {
    const response = await userApiService.updateUser(data);
    return response;
  }
);

export const updateUserThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(
      updateUserThunk.fulfilled,
      (state, action: PayloadAction<ApiResponse<UpdateUserResponse>>) => {
        if (!action.payload.isSucceeded || !action.payload.data) return;

        const userToUpdate = action.payload.data.content;
        state.users = state.users.map((user) =>
          user._id === userToUpdate._id ? userToUpdate : user
        );
      }
    )
    .addCase(updateUserThunk.rejected, () => {});
};
