import { createSlice, Reducer } from "@reduxjs/toolkit";
import { ContactState } from "./contact-state";
import { contactThunkActionBuilder } from "./contact.thunk-builder";

const initialState: ContactState = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: contactThunkActionBuilder,
});

const contactReducer: Reducer<ContactState> = contactSlice.reducer;
export const contactInitialState = initialState;
export default contactReducer;
