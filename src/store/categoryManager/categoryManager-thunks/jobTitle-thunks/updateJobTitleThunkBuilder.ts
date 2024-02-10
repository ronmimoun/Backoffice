import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { jobTitleApiService } from "../../../../services/api/jobTitle.api.service";
import { UpdateJobTitleRequest } from "../../../../models/job-title/update/updateJobTitle.request";
import { UpdateJobTitleResponse } from "../../../../models/job-title/update/updateJobTitle.response";

export const updateJobTitleThunk = createAsyncThunk(
  "categoryManager/updateJobTitleThunk",
  async (
    request: UpdateJobTitleRequest
  ): Promise<ApiResponse<UpdateJobTitleResponse>> => {
    const response = await jobTitleApiService.update(request);
    return response;
  }
);

export const updateJobTitleThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    updateJobTitleThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<UpdateJobTitleResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      const updatedJobTitle = action.payload.data?.content;

      const jobTitleToUpdateIndex = state.jobTitles.findIndex(
        (jobTitle) => jobTitle._id === updatedJobTitle._id
      );

      if (jobTitleToUpdateIndex < 0) return;
      let jobTitles = [...state.jobTitles];

      jobTitles = state.jobTitles.splice(
        jobTitleToUpdateIndex,
        1,
        updatedJobTitle
      );
    }
  );
};
