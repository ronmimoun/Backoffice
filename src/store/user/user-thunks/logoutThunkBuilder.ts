import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { authApiService } from "../../../services/api/auth.api.service";
import { ApiResponse } from "../../../models/base/api-base";
import { userUtilService } from "../../../utils/user.utils";

export const logoutThunk = createAsyncThunk("user/logoutThunk", async () => {
  const response = await authApiService.logout();
  return response;
});

export const logoutThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(logoutThunk.pending, () => {})
    .addCase(
      logoutThunk.fulfilled,
      (state, action: PayloadAction<ApiResponse<void>>) => {
        if (!action.payload.isSucceeded) return;

        userUtilService.clearLocalUser();
        state.currentUser = null;
      }
    )
    .addCase(logoutThunk.rejected, () => {});
};
