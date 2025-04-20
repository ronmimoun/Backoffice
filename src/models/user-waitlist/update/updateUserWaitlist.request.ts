import { ApproveUserStatusEnum } from "../../../enums/userWaitlist.enum";

export type UpdateUserWaitlistRequest = {
  status: ApproveUserStatusEnum;
  userId: string;
};
