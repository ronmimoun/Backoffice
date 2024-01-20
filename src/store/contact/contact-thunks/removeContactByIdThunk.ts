import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ContactState } from "../contact-state";
import { contactApiService } from "../../../services/api/contact.api.service";

export type RemoveContactByIdThunkResponse = {
  isSucceeded: boolean;
  content: string;
} | null;

export const removeContactByIdThunk = createAsyncThunk(
  "contact/removeContactById",
  async (contactId: string) => {
    const response = await contactApiService.removeContactById(contactId);
    if (!response.isSucceeded) return null;

    return { isSucceeded: response.isSucceeded, content: contactId };
  }
);

export const removeContactByIdThunkBuilder = (
  builder: ActionReducerMapBuilder<ContactState>
) => {
  builder
    .addCase(removeContactByIdThunk.pending, () => {})
    .addCase(
      removeContactByIdThunk.fulfilled,
      (state, action: PayloadAction<RemoveContactByIdThunkResponse>) => {
        if (
          !action.payload ||
          !action.payload?.isSucceeded ||
          !action.payload?.content
        )
          return;

        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload!.content
        );
      }
    )
    .addCase(removeContactByIdThunk.rejected, () => {});
};
