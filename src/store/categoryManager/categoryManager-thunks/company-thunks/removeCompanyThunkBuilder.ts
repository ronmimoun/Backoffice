import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { companyApiService } from "../../../../services/api/company.api.service";
import { RemoveCompanyRequest } from "../../../../models/company/remove/removeCompany.request";
import { RemoveCompanyResponse } from "../../../../models/company/remove/removeCompany.response";

export const removeCompanyThunk = createAsyncThunk(
  "categoryManager/removeCompanyThunk",
  async (
    request: RemoveCompanyRequest
  ): Promise<ApiResponse<RemoveCompanyResponse>> => {
    const response = await companyApiService.remove(request);
    return response;
  }
);

export const removeCompanyThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    removeCompanyThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<RemoveCompanyResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      state.companies = state.companies.filter(
        (company) => company._id !== action.payload.data?.content
      );
    }
  );
};
