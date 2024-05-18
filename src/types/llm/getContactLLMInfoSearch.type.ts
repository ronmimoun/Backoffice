export type GetContactLLMInfoSearchResponse = string;

export type GetContactLLMInfoSearchRequest = {
  name: string;
  lastName: string;
  jobTitle: string;
  company?: string;
};
