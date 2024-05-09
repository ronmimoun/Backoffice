import classes from "./SupportChat.module.scss";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { supportChatApiService } from "../../../services/api/supportChat.service.api.service";
import { ChatModel } from "../../../types/support-chat.type";
import { ChatList } from "./ChatList/ChatList";
import { MessagesList } from "./MessagesList/MessagesList";

const SupportChat = () => {
  const [supportChats, setSupportChats] = useState<ChatModel[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatModel>();

  useEffect(() => {
    const loadSupportChats = async () => {
      const response = await supportChatApiService.get({});
      if (!response.isSucceeded || !response.data?.content) return;

      setSupportChats(response.data.content);
    };

    loadSupportChats();
  }, []);

  const handleChatSelection = useCallback((chat: ChatModel) => {
    setSelectedChat(chat);
  }, []);

  return (
    <Box className={classes.container}>
      <ChatList
        chats={supportChats}
        onClick={handleChatSelection}
        selectedChat={selectedChat}
      />
      <MessagesList selectedChat={selectedChat} />
    </Box>
  );
};

export default SupportChat;
