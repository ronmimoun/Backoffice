import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { countryApiService } from "../../../services/api/country.api.service";
import { CountryModel } from "../../../types/country.type";
import { GlobalState } from "../global-state";

type globalInitThunkResponse = {
  countries: CountryModel[] | null;
};

export const globalInitThunk = createAsyncThunk(
  "global/globalInitThunk",
  async (): Promise<globalInitThunkResponse> => {
    const countryResponse = await countryApiService.query();

    if (!countryResponse.isSucceeded || !countryResponse.data?.content)
      return { countries: null };

    return { countries: countryResponse.data.content };
  }
);

export const globalInitThunkBuilder = (
  builder: ActionReducerMapBuilder<GlobalState>
) => {
  builder
    .addCase(globalInitThunk.pending, () => {})
    .addCase(
      globalInitThunk.fulfilled,
      (state, action: PayloadAction<globalInitThunkResponse>) => {
        if (action.payload.countries) {
          state.countries = action.payload.countries;
        }
      }
    )
    .addCase(globalInitThunk.rejected, () => {});
};
