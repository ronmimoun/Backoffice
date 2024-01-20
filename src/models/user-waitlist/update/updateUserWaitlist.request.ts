import { UserWaitlistEnum } from "../../../enums/userWaitlist.enum";
import { UserWaitlistModel } from "../../../types/user-waitlist.type";

export type UpdateUserWaitlistRequest = {
  status: UserWaitlistEnum;
  pendingUser: UserWaitlistModel;
};
