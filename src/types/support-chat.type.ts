export type ChatModel = {
  _id: string;
  fullname: string;
  chatImg: string;
  username: string;
  messages: MessageModel[];
  userId: string;
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
