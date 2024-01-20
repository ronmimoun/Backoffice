import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { buildResponse } from "../../../utils/api.utils";
import { CategoryManagerState } from "../categoryManager-state";
import { getCategoryManagerResponse } from "../../../models/category-manager/get/getCategoryManager.response";
import { categoriesApiService } from "../../../services/api/categoryManager.api.service";

export type initializeCategoryManagerThunkResponse = {
  isSucceeded: boolean;
  data: getCategoryManagerResponse | null;
};

export const initializeCategoryManagerThunk = createAsyncThunk(
  "categoryManager/initializeCategoryManager",
  async (): Promise<initializeCategoryManagerThunkResponse> => {
    const categoryManagerResponse =
      await categoriesApiService.getCategoryManager();
    if (!categoryManagerResponse.isSucceeded || !categoryManagerResponse.data)
      return buildResponse(false, null);

    return buildResponse(true, categoryManagerResponse.data.content);
  }
);

export const initializeCategoryManagerThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    initializeCategoryManagerThunk.fulfilled,
    (state, action: PayloadAction<initializeCategoryManagerThunkResponse>) => {
      if (!action.payload.isSucceeded || !action.payload.data) return;
      const { categories, companies, jobTitles, countries } =
        action.payload.data;
      state.categories = categories;
      state.companies = companies;
      state.jobTitles = jobTitles;
      state.countries = countries;
    }
  );
};
