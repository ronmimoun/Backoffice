import { ContactModel } from "./contact.type";

export type AgentContactRequestModel = {
  contact: ContactModel;
  createdAt: Date;
  isApproved: boolean;
  status: string;
  updatedAt: Date;
  _id: string;
};
