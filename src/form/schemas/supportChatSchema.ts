import { z } from "zod";

export const SUPPORT_CHAT_FORM_CONFIG = {
  FORM_NAME: "Support Chat",
  INPUTS: {
    MESSAGE: {
      KEY: "message",
      IS_REQUIRED: true,
      DEFAULT_VALUE: "",
    },
  },
};

export const SUPPORT_CHAT_SCHEMA = z.object({
  message: z.string().min(3).max(30),
});

export type SupportChatForm = z.infer<typeof SUPPORT_CHAT_SCHEMA>;
