import { AgentModel, ContactModel } from "./contact.type";

export type AgentContactRequestModel = {
  contactInfo: ContactApplyRequestInfo;
  isApproved: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  agent: AgentModel;
  _id: string;
};

export type ContactApplyRequestInfo = Pick<
  ContactModel,
  | "_id"
  | "category"
  | "company"
  | "name"
  | "familyName"
  | "jobTitle"
  | "country"
  | "desc"
  | "phone"
  | "linkedinLink"
>;
