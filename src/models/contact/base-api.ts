import { ContactModel } from "../../types/contact.type";

export type EditOrNewContactTypeBase = Omit<ContactModel, NonEditable>;

type NonEditable =
  | "img"
  | "mobile"
  | "transactionHistory"
  | "createdAt"
  | "averageRating"
  | "numberOfRatings";
