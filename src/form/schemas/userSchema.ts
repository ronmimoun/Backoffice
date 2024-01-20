import { z } from "zod";

export const USER_SCHEMA = z.object({
  username: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
});

export type EditUserForm = z.infer<typeof USER_SCHEMA>;

export const USER_FORM_CONFIG = {
  FORM_NAME: "USER_FORM",
  INPUTS: {
    USERNAME: {
      KEY: "username",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Edit username",
      LABEL: "Username",
    },
    EMAIL: {
      KEY: "email",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Edit email",
      LABEL: "Email",
    },
    PHONE: {
      KEY: "phone",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Edit phone",
      LABEL: "Phone",
    },
    ADDRESS: {
      KEY: "address",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Edit address",
      LABEL: "Address",
    },
  },
};
