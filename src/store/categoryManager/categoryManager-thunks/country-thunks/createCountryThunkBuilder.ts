import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { countryApiService } from "../../../../services/api/country.api.service";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { CreateCountryRequest } from "../../../../models/country/create/createCountry.request";
import { CreateCountryResponse } from "../../../../models/country/create/createCountry.response";

export const createCountryThunk = createAsyncThunk(
  "categoryManager/createCountryThunk",
  async (
    request: CreateCountryRequest
  ): Promise<ApiResponse<CreateCountryResponse>> => {
    const response = await countryApiService.create(request);
    return response;
  }
);

export const createCountryThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    createCountryThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<CreateCountryResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      state.countries.unshift(action.payload.data.content);
    }
  );
};
