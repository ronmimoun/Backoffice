import { CreditTransactionEnum } from "../enums/CreditTransactionType.enum";
import { ImageModel } from "./image.type";

export type CreditTransactionModel = {
  createdAt: Date;
  creditId: string;
  creditName: string;
  creditQuantity: number;
  packagePrice: number;
  type: CreditTransactionEnum.credit_purchase;
  userInfo: UserInfo;
  _id: string;
};

type UserInfo = {
  userId: string;
  imgUrl: ImageModel | null;
  fullname: string;
};
