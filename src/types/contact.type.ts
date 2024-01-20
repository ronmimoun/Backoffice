import { ContactEmailsEnum } from "../enums/contact.enum";

export type ContactModel = {
  company: string;
  desc: string | null;
  country?: string;
  category: string;
  jobTitle: string;
  price: number;
  inStock: boolean;
  name: string;
  familyName: string;
  emails: EmailModel[];
  mobile: string;
  phone: string | null;
  linkedinLink: string;
  agent: AgentModel | null;
  img: Image;
  createdAt: Date;
  transactionHistory: Array<TransactionHistoryModel>;
  averageRating: number;
  numberOfRatings: number;
  _id: string;
};

export type EmailModel = {
  emailUrl: string;
  type: ContactEmailsEnum;
};

export type AgentModel = {
  _id: string;
  fullname: string;
  imgUrl: string | null;
};

type Image = {
  url: string;
  _id: string;
};

export type TransactionHistoryModel = {
  transactionId: string;
  createdAt: Date;
  priceInCredit: number;
  userId: string;
  type: string;
};
