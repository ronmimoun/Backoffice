import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { UserModel } from "../../types/user.type";
import { UserState } from "./user-state";
import { userThunkActionBuilder } from "./user.thunk-builder";
import { userUtilService } from "../../utils/user.utils";

const initialState: UserState = {
  currentUser: userUtilService.getLoggedinUser() || null,
  jwtToken: userUtilService.getUserJwtToken() || null,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserModel>) => {
      userUtilService.saveLocalUser(action.payload);
      state.currentUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserModel[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: userThunkActionBuilder,
});

const userReducer: Reducer<UserState> = userSlice.reducer;
export const userInitialState = initialState;
export default userReducer;
