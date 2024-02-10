import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { categoryApiService } from "../../../../services/api/category.api.service";
import { UpdateCategoryRequest } from "../../../../models/category/update/updateCategory.request";
import { UpdateCategoryResponse } from "../../../../models/category/update/updateCategory.response";

export const updateCategoryThunk = createAsyncThunk(
  "categoryManager/updateCategoryThunk",
  async (
    request: UpdateCategoryRequest
  ): Promise<ApiResponse<UpdateCategoryResponse>> => {
    const response = await categoryApiService.update(request);
    return response;
  }
);

export const updateCategoryThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    updateCategoryThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<UpdateCategoryResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      const updatedCategory = action.payload.data?.content;

      const categoryToUpdateIndex = state.categories.findIndex(
        (category) => category._id === updatedCategory._id
      );

      if (categoryToUpdateIndex < 0) return;
      let categories = [...state.categories];

      categories.splice(categoryToUpdateIndex, 1, updatedCategory);
      state.categories = categories;
    }
  );
};
