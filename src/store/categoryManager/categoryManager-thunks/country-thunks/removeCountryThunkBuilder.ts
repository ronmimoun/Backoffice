import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { countryApiService } from "../../../../services/api/country.api.service";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { RemoveCountryResponse } from "../../../../models/country/remove/removeCountry.response";

export const removeCountryThunk = createAsyncThunk(
  "categoryManager/removeCountryThunk",
  async (request: string): Promise<ApiResponse<RemoveCountryResponse>> => {
    const response = await countryApiService.remove(request);
    return response;
  }
);

export const removeCountryThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    removeCountryThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<RemoveCountryResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      state.categories = state.categories.filter(
        (country) => country._id !== action.payload.data?.content
      );
    }
  );
};
