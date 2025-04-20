export type CreateSupportChatRequest = {
  chatId: string;
  senderId: string;
  receiverId: string;
  message: string;
  isUserSender: boolean;
  senderName: string;
};
