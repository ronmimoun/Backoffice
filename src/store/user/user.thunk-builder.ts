import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "./user-state";
import { loginThunkBuilder, loginThunk } from "./user-thunks/loginThunkBuilder";
import {
  getUsersThunkBuilder,
  getUsersThunk,
} from "./user-thunks/getUsersThunkBuilder";
import {
  updateUserThunkBuilder,
  updateUserThunk,
} from "./user-thunks/updateUserThunkBuilder";
import {
  removeUserThunkBuilder,
  removeUserThunk,
} from "./user-thunks/removeUserThunkBuilder";
import {
  createUserThunkBuilder,
  createUserThunk,
} from "./user-thunks/createUserThunkBuilder";
import {
  logoutThunkBuilder,
  logoutThunk,
} from "./user-thunks/logoutThunkBuilder";

export const userThunkActionBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  loginThunkBuilder(builder);
  getUsersThunkBuilder(builder);
  updateUserThunkBuilder(builder);
  removeUserThunkBuilder(builder);
  createUserThunkBuilder(builder);
  logoutThunkBuilder(builder);
};

export const userThunkActions = {
  loginThunk,
  getUsersThunk,
  updateUserThunk,
  removeUserThunk,
  createUserThunk,
  logoutThunk,
};
