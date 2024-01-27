import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ContactState } from "./contact-state";
import {
  getContactsThunkBuilder,
  getContactsThunk,
} from "./contact-thunks/getContactsThunk";
import {
  removeContactByIdThunkBuilder,
  removeContactByIdThunk,
} from "./contact-thunks/removeContactByIdThunk";
import {
  updateContactThunkBuilder,
  updateContactThunk,
} from "./contact-thunks/updateContactThunk";
import {
  createContactThunkBuilder,
  createContactThunk,
} from "./contact-thunks/createContactThunk";
import {
  createManyContactsThunkBuilder,
  createManyContactsThunk,
} from "./contact-thunks/createManyContactsThunk";

export const contactThunkActionBuilder = (
  builder: ActionReducerMapBuilder<ContactState>
) => {
  getContactsThunkBuilder(builder);
  removeContactByIdThunkBuilder(builder);
  updateContactThunkBuilder(builder);
  createContactThunkBuilder(builder);
  createManyContactsThunkBuilder(builder);
};

export const contactThunkActions = {
  getContactsThunk,
  removeContactByIdThunk,
  updateContactThunk,
  createContactThunk,
  createManyContactsThunk,
};
