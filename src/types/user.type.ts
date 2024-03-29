import { AgentMessageModel } from "./agent-message.type";
import { CountryModel } from "./country.type";

export type UserModel = {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  imgUrl: ImgUrl | null;
  phone: string;
  address: string;
  fullname: string;
  isActive: boolean;
  gender: string;
  permissions: Array<string>;
  favorites: Array<any>;
  credits: number;
  creditTransactions: Array<any>;
  contactTransactions: Array<any>;
  contactUploads: Array<any>;
  searchHistory: Array<any>;
  notifications: Array<any>;
  income: number;
  verified: boolean;
  approveStatus: string;
  countryPreferences: Array<CountryModel>;
  agentMessages: Array<AgentMessageModel>;
};

type ImgUrl = {
  url: string;
  _id: string;
};
