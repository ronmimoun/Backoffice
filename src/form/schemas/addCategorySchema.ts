import { z } from "zod";

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
  category: z.string(),
});

export type AddCategoryFormType = z.infer<typeof ADD_CATEGORY_SCHEMA>;
