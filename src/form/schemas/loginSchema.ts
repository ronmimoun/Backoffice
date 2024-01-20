import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
  password: z.string(),
  username: z.string(),
});

export type LoginForm = z.infer<typeof LOGIN_SCHEMA>;

export const LOGIN_FORM_CONFIG = {
  FORM_NAME: "LOGIN_FORM",
  INPUTS: {
    USERNAME: {
      KEY: "username",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter username",
    },
    PASSWORD: {
      KEY: "password",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter password",
    },
  },
};
