import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CategoryManagerState } from "../categoryManager-state";
import { ApiResponse } from "../../../models/base/api-base";
import { CreateCategoryRequest } from "../../../models/category/create/createCategory.request";
import { CreateCategoryResponse } from "../../../models/category/create/createCategory.response";
import { categoryApiService } from "../../../services/api/category.api.service";

export const createCategoryThunk = createAsyncThunk(
  "categoryManager/createCategoryThunk",
  async (
    request: CreateCategoryRequest
  ): Promise<ApiResponse<CreateCategoryResponse>> => {
    const response = await categoryApiService.create(request);
    return response;
  }
);

export const createCategoryThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    createCategoryThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<CreateCategoryResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      state.categories.push(action.payload.data.content);
    }
  );
};
