import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CategoryManagerState } from "../../categoryManager-state";
import { ApiResponse } from "../../../../models/base/api-base";
import { companyApiService } from "../../../../services/api/company.api.service";
import { UpdateCompanyRequest } from "../../../../models/company/update/updateCompany.request";
import { UpdateCompanyResponse } from "../../../../models/company/update/updateCompany.response";

export const updateCompanyThunk = createAsyncThunk(
  "categoryManager/updateCompanyThunk",
  async (
    request: UpdateCompanyRequest
  ): Promise<ApiResponse<UpdateCompanyResponse>> => {
    const response = await companyApiService.update(request);
    return response;
  }
);

export const updateCompanyThunkBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  builder.addCase(
    updateCompanyThunk.fulfilled,
    (state, action: PayloadAction<ApiResponse<UpdateCompanyResponse>>) => {
      if (!action.payload.isSucceeded || !action.payload.data?.content) return;

      const updatedCompany = action.payload.data?.content;

      const companyToUpdateIndex = state.companies.findIndex(
        (company) => company._id === updatedCompany._id
      );

      if (companyToUpdateIndex < 0) return;
      let companies = [...state.companies];

      companies.splice(companyToUpdateIndex, 1, updatedCompany);
      state.companies = companies;
    }
  );
};
