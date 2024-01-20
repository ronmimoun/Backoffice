import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ContactState } from "../contact-state";
import { contactApiService } from "../../../services/api/contact.api.service";
import { CreateContactRequest } from "../../../models/contact/create/createContact.request";
import { ApiResponse } from "../../../models/base/api-base";
import { CreateContactResponse } from "../../../models/contact/create/createContact.response";

export const createContactThunk = createAsyncThunk(
  "contact/createContact",
  async (requestPayload: CreateContactRequest) => {
    const response = contactApiService.create(requestPayload);
    return response;
  }
);

export const createContactThunkBuilder = (
  builder: ActionReducerMapBuilder<ContactState>
) => {
  builder
    .addCase(createContactThunk.pending, () => {})
    .addCase(
      createContactThunk.fulfilled,
      (state, action: PayloadAction<ApiResponse<CreateContactResponse>>) => {
        if (!action.payload.isSucceeded || !action.payload.data?.content)
          return;

        state.contacts.push(action.payload.data.content);
      }
    )
    .addCase(createContactThunk.rejected, () => {});
};
