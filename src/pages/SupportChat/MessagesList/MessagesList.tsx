import classes from "./MessagesList.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { ButtonPrimary } from "../../../components/ui/Button/ButtonPrimary";
import { Input } from "../../../components/ui/Input/Input";
import { Box } from "@mui/material";
import { ChatModel, MessageModel } from "../../../types/support-chat.type";
import { List } from "@mui/material";
import { Message } from "../Message/Message";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollToBottom } from "../../../hooks/useScrollTobottom";
import {
  SUPPORT_CHAT_FORM_CONFIG,
  SUPPORT_CHAT_SCHEMA,
  SupportChatForm,
} from "../../../form/schemas/supportChatSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { supportChatApiService } from "../../../services/api/supportChat.service.api.service";
import { CreateSupportChatRequest } from "../../../models/support-chat/create/createSupportChat.request";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../store/user/user.selectors";
import { UserModel } from "../../../types/user.type";

type MessagesListProps = {
  selectedChat?: ChatModel;
};

export const MessagesList = ({ selectedChat }: MessagesListProps) => {
  const { _id } = useSelector(userSelectors.currentUser()) as UserModel;
  const formMethods = useForm<SupportChatForm>({
    defaultValues: {
      [SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY]:
        SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.DEFAULT_VALUE,
    },
    resolver: zodResolver(SUPPORT_CHAT_SCHEMA),
  });
  const listRef = useRef<HTMLUListElement>(null);
  const scrollToBottom = useScrollToBottom(listRef);
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const loadChatMessages = async () => {
    if (!selectedChat) return;

    const response = await supportChatApiService.getById(selectedChat.chatId);
    if (!response.isSucceeded || !response.data?.content) return;

    setMessages(response.data.content.messages);
  };

  useEffect(() => {
    loadChatMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (!messages) return;
    scrollToBottom();
  }, [messages]);

  const handleSubmit = useCallback(
    async ({ message }: SupportChatForm) => {
      if (!selectedChat || !message) return;
      const request: CreateSupportChatRequest = {
        receiverId: selectedChat?.chatId,
        message,
        userId: _id,
      };

      const response = await supportChatApiService.create(request);
      if (!response.isSucceeded || !response.data?.content) return;

      setMessages([...messages, response.data.content]);
      formMethods.reset();
    },
    [scrollToBottom, listRef, messages]
  );

  return (
    <Box className={classes.messages_wrapper}>
      <List className={classes.messages_list} ref={listRef}>
        {messages &&
          messages.map((message, idx) => {
            return <Message key={idx} {...message} />;
          })}
      </List>

      {selectedChat && (
        <FormProvider {...formMethods}>
          <form
            className={classes.form}
            onSubmit={formMethods.handleSubmit(handleSubmit)}
          >
            <Input
              className={classes.form__input}
              name={SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY}
              required={SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.IS_REQUIRED}
            />
            <ButtonPrimary type="submit">Send</ButtonPrimary>
          </form>
        </FormProvider>
      )}
    </Box>
  );
};
