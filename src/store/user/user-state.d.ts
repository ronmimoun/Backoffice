import { UserModel } from "../../types/user.type";

type UserState = {
  currentUser: UserModel | null;
  users: UserModel[];
  jwtToken: string | null;
};
