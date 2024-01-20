import { ContactEmailsEnum } from "../enums/contact.enum";
import { AgentModel, ContactModel, EmailModel } from "../types/contact.type";
import { UserModel } from "../types/user.type";
import { store } from "./non-circular-injection.utils";

function createNewEmail(
  emailUrl: string,
  emailType: ContactEmailsEnum
): EmailModel {
  return {
    emailUrl,
    type: emailType,
  };
}

function getContactEmailByType(
  contactId: string,
  emailType: ContactEmailsEnum
): string | null {
  const contact = getContactFromStoreById(contactId);

  if (!contact) return null;

  const contactEmail = contact.emails.find((email) => email.type === emailType);

  if (!contactEmail) return null;

  return contactEmail.emailUrl;
}

function updateContactEmail(
  contactId: string,
  emailType: ContactEmailsEnum,
  updatedEmail: string
) {
  const contact = getContactFromStoreById(contactId);

  if (!contact) return null;

  const brokenRefEmails = [...contact.emails];

  const emails = brokenRefEmails.map((email) => {
    const newEmail = { ...email };
    if (email.type === emailType) {
      newEmail.emailUrl = updatedEmail;
      return newEmail;
    } else {
      return newEmail;
    }
  });
  return emails;
}

function assembleAgent(user?: UserModel): AgentModel | null {
  if (!user) return null;

  return {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl?.url || null,
  };
}

function getContactFromStoreById(contactId: string): ContactModel | undefined {
  return store
    .getState()
    .contact.contacts.find((contact) => contact._id === contactId);
}

export const contactUtilService = {
  getContactEmailByType,
  updateContactEmail,
  assembleAgent,
  createNewEmail,
};
