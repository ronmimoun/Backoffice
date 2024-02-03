import { CreditTransactionEnum } from "../enums/CreditTransactionType.enum";
import { ContactModel } from "./contact.type";

export type ContactTransactionModel = {
  contact: ContactModel;
  createdAt: Date;
  priceInCredit: number;
  type: CreditTransactionEnum;
  userId: string;
  _id: string;
};
