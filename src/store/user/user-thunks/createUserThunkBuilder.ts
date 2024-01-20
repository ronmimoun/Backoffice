import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { userApiService } from "../../../services/api/user.api.service";
import { CreateUserRequest } from "../../../models/user/create-user/createUser.request";
import { ApiResponse } from "../../../models/base/api-base";
import { CreateUserResponse } from "../../../models/user/create-user/createUser.response";

export const createUserThunk = createAsyncThunk(
  "user/createUser",
  async (request: CreateUserRequest) => {
    const resposne = await userApiService.create(request);
    return resposne;
  }
);

export const createUserThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(createUserThunk.pending, () => {})
    .addCase(
      createUserThunk.fulfilled,
      (state, action: PayloadAction<ApiResponse<CreateUserResponse>>) => {
        if (!action.payload.isSucceeded || !action.payload.data?.content)
          return;

        state.users.push(action.payload.data.content);
      }
    )
    .addCase(createUserThunk.rejected, () => {});
};
