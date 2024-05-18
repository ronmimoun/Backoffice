import { ContactModel } from "../contact.type";

export type UpdateSubmittedInfoSearchRequest = {
  contactId: string;
  submittedInfoSearch: string;
};

export type UpdateSubmittedInfoSearchResponse = {} & ContactModel;
