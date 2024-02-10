import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ContactState } from "../contact-state";
import { contactApiService } from "../../../services/api/contact.api.service";
import { RemoveContactByIdRequest } from "../../../models/contact/remove/removeContactById.request";
import { RemoveContactByIdResponse } from "../../../models/contact/remove/removeContactById.response";
import { ApiResponse } from "../../../models/base/api-base";

export const removeContactByIdThunk = createAsyncThunk(
  "contact/removeContactById",
  async (contactId: RemoveContactByIdRequest) => {
    const response = await contactApiService.removeContactById(contactId);
    return response;
  }
);

export const removeContactByIdThunkBuilder = (
  builder: ActionReducerMapBuilder<ContactState>
) => {
  builder
    .addCase(removeContactByIdThunk.pending, () => {})
    .addCase(
      removeContactByIdThunk.fulfilled,
      (
        state,
        action: PayloadAction<ApiResponse<RemoveContactByIdResponse>>
      ) => {
        if (!action.payload.isSucceeded || !action.payload.data?.content)
          return;

        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload.data?.content
        );
      }
    )
    .addCase(removeContactByIdThunk.rejected, () => {});
};
