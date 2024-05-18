import { z } from "zod";

export const REVIEW_CONTACT_INFORMATION_SCHEMA = z.object({
  contactLLMInformation: z.string(),
});

export type ReviewContactInformationForm = z.infer<
  typeof REVIEW_CONTACT_INFORMATION_SCHEMA
>;

export const REVIEW_CONTACT_INFORMATION_FORM_CONFIG = {
  FORM_NAME: "REVIEW_CONTACT_INFORMATION",
  INPUTS: {
    CONTACT_LLM_INFORMATION: {
      KEY: "contactLLMInformation",
      DEFAULT_VALUE: "",
    },
  },
};
