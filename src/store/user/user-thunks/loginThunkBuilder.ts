import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { userUtilService } from "../../../utils/user.utils";
import { LoginResponse } from "../../../models/auth/login/login.response";
import { LoginRequest } from "../../../models/auth/login/login.request";
import { authApiService } from "../../../services/api/auth.api.service";
import { ApiResponse } from "../../../models/base/api-base";

export type UserAuthThunkResponse = {
  isSucceeded: boolean;
  data: LoginResponse | null;
};

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const userResponse = await authApiService.login(data);

    if (!userResponse.isSucceeded || !userResponse.data) return userResponse;

    const user = userResponse.data.content;
    userUtilService.saveLocalUser(user);
    return userResponse;
  }
);

export const loginThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(loginThunk.pending, () => {})
    .addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<ApiResponse<LoginResponse>>) => {
        if (
          !action.payload.data ||
          !userUtilService.isAdmin(action.payload.data.content)
        )
          return;
        state.currentUser = action.payload.data.content;
      }
    )
    .addCase(loginThunk.rejected, () => {});
};
