import { z } from "zod";

export const ADD_USER_SCHEMA = z.object({
  username: z.string(),
  fullname: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  permissions: z.string(),
  gender: z.string(),
  isActive: z.string(),
});

export type AddUserForm = z.infer<typeof ADD_USER_SCHEMA>;

export const ADD_USER_FORM_CONFIG = {
  FORM_NAME: "Create new user",
  INPUTS: {
    USERNAME: {
      KEY: "username",
      DEFAULT_VALUE: "",
      LABEL: "Username",
      IS_REQUIRED: true,
    },
    FULLNAME: {
      KEY: "fullname",
      DEFAULT_VALUE: "",
      LABEL: "Fullname",
      IS_REQUIRED: true,
    },
    PASSWORD: {
      KEY: "password",
      DEFAULT_VALUE: "",
      LABEL: "Password",
      IS_REQUIRED: true,
    },
    PERMISSIONS: {
      KEY: "permissions",
      DEFAULT_VALUE: "",
      LABEL: "User Type",
      IS_REQUIRED: true,
      ACCESSORS: {
        NAME: "name",
      },
    },
    GENDER: {
      KEY: "gender",
      DEFAULT_VALUE: "",
      LABEL: "User Gender",
      IS_REQUIRED: true,
      ACCESSORS: {
        NAME: "name",
        VALUE: "value",
      },
    },
    IS_ACTIVE: {
      KEY: "isActive",
      DEFAULT_VALUE: "",
      LABEL: "Is Active User",
      IS_REQUIRED: true,
      ACCESSORS: {
        NAME: "name",
        VALUE: "value",
      },
    },
    EMAIL: {
      KEY: "email",
      DEFAULT_VALUE: "",
      LABEL: "Email",
      IS_REQUIRED: true,
    },
    PHONE: {
      KEY: "phone",
      DEFAULT_VALUE: "",
      LABEL: "Phone",
      IS_REQUIRED: true,
    },
    ADDRESS: {
      KEY: "address",
      DEFAULT_VALUE: "",
      LABEL: "Address",
      IS_REQUIRED: true,
    },
  },
};
