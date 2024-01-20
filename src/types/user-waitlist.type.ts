export type UserWaitlistModel = {
  approveStatus: ApproveStatusType;
  email: string;
  fullname: string;
  registeredAt: string;
  userId: string;
  username: string;
  _id: string;
};

type ApproveStatusType = "approved";
