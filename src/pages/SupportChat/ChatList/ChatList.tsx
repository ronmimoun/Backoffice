import classes from "./ChatList.module.scss";
import { CircularImage } from "../../../components/shared/CircularImage/CircularImage";
import { NO_IMAGE_FALLBACK } from "../../../constants/image.constants";
import { ChatModel } from "../../../types/support-chat.type";
import { List, ListItem, Typography } from "@mui/material";
import { useCallback } from "react";

type ChatListProps = {
  chats: ChatModel[];
  onClick: (chat: ChatModel) => void;
  selectedChat?: ChatModel;
};

export const ChatList = ({ chats, onClick, selectedChat }: ChatListProps) => {
  const handleChatSelection = useCallback(
    (chat: ChatModel) => {
      onClick && onClick(chat);
    },
    [onClick]
  );

  return (
    <List className={classes.chat_list}>
      {chats.map((chat) => {
        return (
          <ListItem
            key={chat.chatId}
            className={`${classes.chat} ${
              selectedChat?.chatId === chat.chatId ? classes.chat_selected : ""
            }`}
            onClick={() => handleChatSelection(chat)}
          >
            <CircularImage
              src={chat?.chatImg || NO_IMAGE_FALLBACK}
              alt="chat"
            />
            <Typography variant="body1">{chat.fullname}</Typography>
          </ListItem>
        );
      })}
    </List>
  );
};
