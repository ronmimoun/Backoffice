import { z } from "zod";
import { REGEX } from "../../constants/regex.constants";

export const ADD_JOB_TITLE_CONFIG = {
  FORM_NAME: "Add job Title Form",
  INPUTS: {
    JOB_TITLE_NAME: {
      KEY: "jobTitleName",
      DEFAULT_VALUE: "",
      IS_REQUIRED: true,
      LABEL: "Job Title Name",
    },
  },
};

export const ADD_JOB_TITLE_SCHEMA = z.object({
  jobTitleName: z
    .string()
    .min(2)
    .max(4)
    .regex(REGEX.WITHOUT_NUMBERS.REGEX, REGEX.WITHOUT_NUMBERS.MESSAGE)
    .trim(),
});

export type AddJobTitleFormType = z.infer<typeof ADD_JOB_TITLE_SCHEMA>;
