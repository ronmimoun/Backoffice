import { ContactModel } from "../../types/contact.type";
import { RootState } from "../root-state";

const getContacts = () => {
  return (state: RootState): ContactModel[] => {
    return state.contact.contacts;
  };
};

const getContactFromStateById = (_id?: string) => {
  return (state: RootState) => {
    return state.contact.contacts.find((contact) => contact._id === _id);
  };
};

export const contactSelectors = {
  getContacts,
  getContactFromStateById,
};
