import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { categoryApiService } from "../../../../services/api/category.api.service";
import { RemoveCategoryRequest } from "../../../../models/category/remove/removeCategory.request";
import { RemoveCategoryResponse } from "../../../../models/category/remove/removeCategory.response";

export const removeCategoryThunk = createAsyncThunk(
  "categoryManager/removeCategoryThunk",
  async (
    request: RemoveCategoryRequest
  ): Promise<ApiResponse<RemoveCategoryResponse>> => {
    const response = await categoryApiService.remove(request);
    return response;
  }
);

export const removeCategoryThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    removeCategoryThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<RemoveCategoryResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      state.categories = state.categories.filter(
        (category) => category._id !== action.payload.data?.content
      );
    }
  );
};
