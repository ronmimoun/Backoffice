import { z } from "zod";
import { REGEX } from "../../constants/regex.constants";

export const ADD_COMPANY_CONFIG = {
  FORM_NAME: "Add Company Form",
  INPUTS: {
    COMPANY_NAME: {
      KEY: "company",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Company Name",
    },
    CATEGORY: {
      KEY: "category",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Select Category",
      ACCESSORS: {
        VALUE: "title",
      },
    },
  },
};

export const ADD_COMPANY_SCHEMA = z.object({
  company: z
    .string()
    .min(3)
    .max(30)
    .trim()
    .regex(
      REGEX.FIRST_LETTER_CAPITAL.REGEX,
      REGEX.FIRST_LETTER_CAPITAL.MESSAGE
    ),
  category: z.string(),
});

export type AddCompanyFormType = z.infer<typeof ADD_COMPANY_SCHEMA>;
