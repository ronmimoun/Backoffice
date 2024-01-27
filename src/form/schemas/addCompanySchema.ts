import { z } from "zod";

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
  company: z.string(),
  category: z.string(),
});

export type AddCompanyFormType = z.infer<typeof ADD_COMPANY_SCHEMA>;
