import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { jobTitleApiService } from "../../../../services/api/jobTitle.api.service";
import { CreateJobTitleRequest } from "../../../../models/job-title/create/createJobTitle.request";
import { CreateJobTitleResponse } from "../../../../models/job-title/create/createJobTitle.response";

export const createJobTitleThunk = createAsyncThunk(
  "categoryManager/createJobTitleThunk",
  async (
    request: CreateJobTitleRequest
  ): Promise<ApiResponse<CreateJobTitleResponse>> => {
    const response = await jobTitleApiService.create(request);
    return response;
  }
);

export const createJobTitleThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    createJobTitleThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<CreateJobTitleResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      state.jobTitles.unshift(action.payload.data.content);
    }
  );
};
