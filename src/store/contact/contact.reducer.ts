import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { ContactState } from "./contact-state";
import { contactThunkActionBuilder } from "./contact.thunk-builder";
import { ContactModel } from "../../types/contact.type";

const initialState: ContactState = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state, action: PayloadAction<ContactModel>) => {
      state.contacts = state.contacts.map((contact) => {
        if (contact._id === action.payload._id) {
          return action.payload;
        }
        return contact;
      });
    },

    clearState: () => initialState,
  },
  extraReducers: contactThunkActionBuilder,
});

const contactReducer: Reducer<ContactState> = contactSlice.reducer;
export const contactInitialState = initialState;
export default contactReducer;
