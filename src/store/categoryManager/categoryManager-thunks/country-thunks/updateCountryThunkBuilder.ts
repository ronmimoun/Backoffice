import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { countryApiService } from "../../../../services/api/country.api.service";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { UpdateCountryResponse } from "../../../../models/country/update/updateCountry.response";
import { UpdateCountryRequest } from "../../../../models/country/update/updateCountry.request";

export const updateCountryThunk = createAsyncThunk(
  "categoryManager/updateCountryThunk",
  async (
    request: UpdateCountryRequest
  ): Promise<ApiResponse<UpdateCountryResponse>> => {
    const response = await countryApiService.update(request);
    return response;
  }
);

export const updateCountryThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    updateCountryThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<UpdateCountryResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      const updatedCountry = action.payload.data?.content;
      const countryToUpdateIndex = state.countries.findIndex(
        (country) => country._id === updatedCountry._id
      );

      if (countryToUpdateIndex < 0) return;
      let countries = [...state.countries];

      countries.splice(countryToUpdateIndex, 1, updatedCountry);
      state.countries = countries;
    }
  );
};
