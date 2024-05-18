import { ContactModel } from "../contact.type";

export type UpdateLastGeneratedInfoSearchRequest = {
  contactId: string;
  lastGeneratedInfoSearch: string;
};

export type UpdateLastGeneratedInfoSearchResponse = {} & ContactModel;
