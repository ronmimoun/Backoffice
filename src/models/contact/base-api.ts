import { ContactModel } from "../../types/contact.type";

export type EditOrNewContactTypeBase = {
  _id?: string;
} & Omit<ContactModel, NonEditable>;

type NonEditable =
  | "_id"
  | "mobile"
  | "transactionHistory"
  | "createdAt"
  | "averageRating"
  | "numberOfRatings";
