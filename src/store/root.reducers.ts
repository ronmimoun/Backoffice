import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/user.reducer";
import globalReducer from "./global/global.reducer";
import modalReducer from "./modal/modal.reducer";
import contactReducer from "./contact/contact.reducer";
import categoryManagerReducer from "./categoryManager/categoryManager.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
  modal: modalReducer,
  contact: contactReducer,
  categoryManager: categoryManagerReducer,
});

export type Rootstate = ReturnType<typeof rootReducer>;
export default rootReducer;
