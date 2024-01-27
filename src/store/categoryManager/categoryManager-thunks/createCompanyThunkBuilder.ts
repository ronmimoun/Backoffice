import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CategoryManagerState } from "../categoryManager-state";
import { ApiResponse } from "../../../models/base/api-base";
import { CreateCompanyRequest } from "../../../models/company/create/createCompany.request";
import { companyApiService } from "../../../services/api/company.api.service";
import { CreateCompanyResponse } from "../../../models/company/create/createCompany.response";

export const createCompanyThunk = createAsyncThunk(
  "categoryManager/createCompanyThunk",
  async (
    request: CreateCompanyRequest
  ): Promise<ApiResponse<CreateCompanyResponse>> => {
    const response = await companyApiService.create(request);
    return response;
  }
);

export const createCompanyThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    createCompanyThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<CreateCompanyResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      state.companies.push(action.payload.data.content);
    }
  );
};
