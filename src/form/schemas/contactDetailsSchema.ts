import { z } from "zod";
import { REGEX } from "../../constants/regex.constants";
import { MESSAGES } from "../../constants/messages.constants";
import { ContactEmailsEnum } from "../../enums/contact.enum";

export const EmailTypes = [
  ContactEmailsEnum.Personal,
  ContactEmailsEnum.Work,
] as const;

export const CONTACT_DETAILS_SCHEMA = z.object({
  company: z.string(),
  name: z.string().min(3).max(20),
  familyName: z.string().min(3).max(20),
  email: z.string().email(),
  desc: z.string().nullable(),
  phone: z
    .string()
    // .regex(REGEX.PHONE, MESSAGES.VALIDATION_ERROR.PHONE)
    .nullable(),
  price: z.string().min(2).max(2),
  country: z.string(),
  linkedinLink: z
    .string()
    .regex(REGEX.LINKED_IN, MESSAGES.VALIDATION_ERROR.LINKED_IN_LINK),
  inStock: z.string(),
  agent: z.string().nullable(),
  jobTitle: z.string(),
  category: z.string(),
  emailType: z.enum(EmailTypes, {
    required_error: MESSAGES.VALIDATION_ERROR.EMAIL_TYPE,
  }),
  img: z.any(),
});

export type ContactDetailsForm = z.infer<typeof CONTACT_DETAILS_SCHEMA>;

export const CONTACT_DETAILS_FORM_CONFIG = {
  FORM_NAME: "Contact Details",
  INPUTS: {
    COMPANY: {
      KEY: "company",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Company",
      IS_REQUIRED: true,
      ACCESSORS: {
        VALUE: "company",
      },
    },
    NAME: {
      KEY: "name",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Name",
      IS_REQUIRED: true,
    },
    FAMILY_NAME: {
      KEY: "familyName",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Family Name",
      IS_REQUIRED: true,
    },
    EMAIL: {
      KEY: "email",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Email",
      IS_REQUIRED: false,
    },
    DESCRIPTION: {
      KEY: "desc",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Description",
      IS_REQUIRED: false,
    },
    PHONE: {
      KEY: "phone",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Phone",
      IS_REQUIRED: false,
    },
    PRICE: {
      KEY: "price",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Price",
      IS_REQUIRED: true,
    },
    COUNTRY: {
      KEY: "country",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Country",
      IS_REQUIRED: true,
      ACCESSORS: {
        VALUE: "name",
      },
    },
    LINKED_IN_LINK: {
      KEY: "linkedinLink",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "LinkedIn link",
      IS_REQUIRED: false,
    },
    IN_STOCK: {
      KEY: "inStock",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Is in stock",
      IS_REQUIRED: true,
      ACCESSORS: {
        VALUE: "name",
      },
    },
    AGENT: {
      KEY: "agent",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Linked Agent",
      IS_REQUIRED: false,
      ACCESSORS: {
        VALUE: "fullname",
      },
    },
    JOB_TITLE: {
      KEY: "jobTitle",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Job Title",
      IS_REQUIRED: true,
      ACCESSORS: {
        VALUE: "title",
      },
    },
    CATEGORY: {
      KEY: "category",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Category",
      IS_REQUIRED: true,
      ACCESSORS: {
        VALUE: "title",
      },
    },
    EMAIL_TYPE: {
      KEY: "emailType",
      PLACEHOLDER: "",
      DEFAULT_VALUE: ContactEmailsEnum.Personal,
      LABEL: "Email Type",
      IS_REQUIRED: true,
      ACCESSORS: {
        VALUE: "type",
      },
    },
    IMAGE: {
      KEY: "img",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Contact Image",
      IS_REQUIRED: false,
    },
  },
};
