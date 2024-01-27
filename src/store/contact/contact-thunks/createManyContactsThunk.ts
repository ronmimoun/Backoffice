import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ContactState } from "../contact-state";
import { contactApiService } from "../../../services/api/contact.api.service";
import { ApiResponse } from "../../../models/base/api-base";
import { CreateManyContactsRequest } from "../../../models/contact/createMany/createManyContacts.request";
import { CreateManyContactsResponse } from "../../../models/contact/createMany/createManyContacts.response";

export const createManyContactsThunk = createAsyncThunk(
  "contact/createManyContacts",
  async (requestPayload: CreateManyContactsRequest) => {
    const response = contactApiService.createMany(requestPayload);
    return response;
  }
);

export const createManyContactsThunkBuilder = (
  builder: ActionReducerMapBuilder<ContactState>
) => {
  builder
    .addCase(createManyContactsThunk.pending, () => {})
    .addCase(
      createManyContactsThunk.fulfilled,
      (
        state,
        action: PayloadAction<ApiResponse<CreateManyContactsResponse>>
      ) => {
        if (!action.payload.isSucceeded || !action.payload.data?.content)
          return;

        state.contacts = [...state.contacts, ...action.payload.data.content];
      }
    )
    .addCase(createManyContactsThunk.rejected, () => {});
};
