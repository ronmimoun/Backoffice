import { z } from "zod";
import { REGEX } from "../../constants/regex.constants";
import { MESSAGES } from "../../constants/messages.constants";
import { countryUtilService } from "../../utils/country.utils";

export const APPROVAL_AGENT_CONTACT_SCHEMA = z.object({
  company: z.string(),
  name: z.string().min(3).max(20),
  familyName: z.string().min(3).max(20),
  desc: z.string().nullable(),
  phone: z.string().regex(REGEX.PHONE, MESSAGES.VALIDATION_ERROR.PHONE),
  linkedinLink: z
    .string()
    .regex(REGEX.LINKED_IN, MESSAGES.VALIDATION_ERROR.LINKED_IN_LINK),
  jobTitle: z.string(),
  category: z.string(),
  country: z.enum(countryUtilService.getCountryTypes(), {
    required_error: "Select a country",
  }),
});

export type ApprovalAgentContactForm = z.infer<
  typeof APPROVAL_AGENT_CONTACT_SCHEMA
>;

export const APPROVAL_AGENT_CONTACT_CONFIG = {
  FORM_NAME: "Approval Agent Contact",
  INPUTS: {
    CATEGORY: {
      KEY: "category",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Category",
      ACCESSORS: {
        VALUE: "title",
      },
    },
    COMPANY: {
      KEY: "company",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Company",
      ACCESSORS: {
        VALUE: "company",
      },
    },
    NAME: {
      KEY: "name",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Name",
    },
    FAMILY_NAME: {
      KEY: "familyName",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Family Name",
    },
    JOB_TITLE: {
      KEY: "jobTitle",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Job Title",
      ACCESSORS: {
        VALUE: "title",
      },
    },
    DESCRIPTION: {
      KEY: "desc",
      DEFAULT_VALUE: "",
      IS_REQUIRED: false,
      LABEL: "Description",
    },
    PHONE: {
      KEY: "phone",
      DEFAULT_VALUE: "",
      IS_REQUIRED: false,
      LABEL: "Phone",
    },
    LINKED_IN_LINK: {
      KEY: "linkedinLink",
      DEFAULT_VALUE: "",
      IS_REQUIRED: false,
      LABEL: "LinkedIn link",
    },
    COUNTRY: {
      KEY: "country",
      DEFAULT_VALUE: "Israel",
      IS_REQUIRED: true,
      LABEL: "Country",
      ACCESSORS: {
        VALUE: "name",
      },
    },
  },
};
