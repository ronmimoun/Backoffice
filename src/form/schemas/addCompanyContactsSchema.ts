import { z } from "zod";

export const ADD_COMPANY_CONTACTS_CONFIG = {
  FORM_NAME: "Add Company Contacts",
  INPUTS: {
    JOB_TITLES: {
      KEY: "jobTitles",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Job Titles",
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
    PRICE: {
      KEY: "price",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Price",
      IS_REQUIRED: true,
    },
    DESCRIPTION: {
      KEY: "desc",
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      LABEL: "Description",
      IS_REQUIRED: false,
    },
  },
};

export const ADD_COMPANY_CONTACTS_SCHEMA = z.object({
  category: z.string(),
  company: z.string(),
  jobTitles: z.array(z.string()),
  price: z.string(),
  inStock: z.string(),
  desc: z.string(),
  country: z.string(),
});

export type AddCompanyContactsForm = z.infer<
  typeof ADD_COMPANY_CONTACTS_SCHEMA
>;
