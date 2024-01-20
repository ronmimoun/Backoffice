import { contactSlice } from "./contact.reducer";
import { contactThunkActions } from "./contact.thunk-builder";

export const contactActions = {
  ...contactSlice.actions,
  ...contactThunkActions,
};
