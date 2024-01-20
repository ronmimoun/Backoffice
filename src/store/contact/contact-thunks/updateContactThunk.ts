import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ContactState } from "../contact-state";
import { contactApiService } from "../../../services/api/contact.api.service";
import { UpdateContactRequest } from "../../../models/contact/update/updateContact.request";
import { ApiResponse } from "../../../models/base/api-base";
import { ContactModel } from "../../../types/contact.type";

export const updateContactThunk = createAsyncThunk(
  "contact/updateContact",
  async (contactForm: UpdateContactRequest) => {
    const response = await contactApiService.update(contactForm);
    return response;
  }
);

export const updateContactThunkBuilder = (
  builder: ActionReducerMapBuilder<ContactState>
) => {
  builder
    .addCase(updateContactThunk.pending, () => {})
    .addCase(
      updateContactThunk.fulfilled,
      (state, action: PayloadAction<ApiResponse<ContactModel>>) => {
        if (
          !action.payload.isSucceeded ||
          !action.payload.data ||
          !action.payload.data?.content
        )
          return;

        state.contacts = state.contacts.map((contact) => {
          if (contact._id === action.payload.data?.content._id) {
            contact = action.payload.data!.content;
          }
          return contact;
        });
      }
    )
    .addCase(updateContactThunk.rejected, () => {});
};
