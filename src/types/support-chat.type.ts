export type ChatModel = {
  chatId: string;
  fullname: string;
  chatImg: string;
  username: string;
  messages: MessageModel[];
};

export type MessageModel = {
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  isUserSender: boolean;
};
