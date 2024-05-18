function generateContactPrompt(contactName: string, jobTitle: string): string {
  return `information on ${contactName} ${jobTitle} at Israel Land Authority Israel linkedin`;
}

export const llmUtilService = {
  generateContactPrompt,
};
