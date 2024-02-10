import { z } from "zod";
import { REGEX } from "../../constants/regex.constants";

export const ADD_COUNTRY_CONFIG = {
  FORM_NAME: "Add Company Form",
  INPUTS: {
    COUNTRY_NAME: {
      KEY: "name",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Country Name",
    },
    COUNTRY_CODE: {
      KEY: "code",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Country Code",
    },
  },
};

export const ADD_COUNTRY_SCHEMA = z.object({
  name: z
    .string()
    .min(3)
    .max(20)
    .regex(
      REGEX.FIRST_LETTER_CAPITAL.REGEX,
      REGEX.FIRST_LETTER_CAPITAL.MESSAGE
    ),
  code: z
    .string()
    .min(2)
    .max(4)
    .regex(REGEX.UPPER_CASE.REGEX, REGEX.UPPER_CASE.MESSAGE),
});

export type AddCountryFormType = z.infer<typeof ADD_COUNTRY_SCHEMA>;
