import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ContactState } from "../contact-state";
import { contactApiService } from "../../../services/api/contact.api.service";
import { ApiResponse } from "../../../models/base/api-base";
import { GetContactsResponse } from "../../../models/contact/get/getContacts.response";

export const getContactsThunk = createAsyncThunk(
  "contact/getContacts",
  async () => {
    const response = await contactApiService.getContacts();
    if (!response.isSucceeded || !response.data?.content) return null;

    return response;
  }
);

export const getContactsThunkBuilder = (
  builder: ActionReducerMapBuilder<ContactState>
) => {
  builder
    .addCase(getContactsThunk.pending, () => {})
    .addCase(
      getContactsThunk.fulfilled,
      (
        state,
        action: PayloadAction<ApiResponse<GetContactsResponse> | null>
      ) => {
        if (
          !action.payload ||
          !action.payload.isSucceeded ||
          !action.payload.data?.content
        )
          return;

        state.contacts = action.payload.data.content;
      }
    )
    .addCase(getContactsThunk.rejected, () => {});
};
