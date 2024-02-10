import { z } from "zod";
import { REGEX } from "../../constants/regex.constants";

export const ADD_CATEGORY_CONFIG = {
  FORM_NAME: "Add Category Form",
  INPUTS: {
    CATEGORY_NAME: {
      KEY: "category",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Category Name",
    },
  },
};

export const ADD_CATEGORY_SCHEMA = z.object({
  category: z
    .string()
    .min(3)
    .max(20)
    .regex(
      REGEX.FIRST_LETTER_CAPITAL.REGEX,
      REGEX.FIRST_LETTER_CAPITAL.MESSAGE
    ),
});

export type AddCategoryFormType = z.infer<typeof ADD_CATEGORY_SCHEMA>;
