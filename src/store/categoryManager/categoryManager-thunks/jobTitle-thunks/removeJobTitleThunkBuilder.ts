import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { jobTitleApiService } from "../../../../services/api/jobTitle.api.service";
import { RemoveJobTitleRequest } from "../../../../models/job-title/remove/removeJobTitle.request";
import { RemoveJobTitleResponse } from "../../../../models/job-title/remove/removeJobTitle.response";

export const removeJobTitleThunk = createAsyncThunk(
  "categoryManager/removeJobTitleThunk",
  async (
    request: RemoveJobTitleRequest
  ): Promise<ApiResponse<RemoveJobTitleResponse>> => {
    const response = await jobTitleApiService.remove(request);
    return response;
  }
);

export const removeJobTitleThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    removeJobTitleThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<RemoveJobTitleResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      state.jobTitles = state.jobTitles.filter(
        (jobTitle) => jobTitle._id !== action.payload.data?.content
      );
    }
  );
};
