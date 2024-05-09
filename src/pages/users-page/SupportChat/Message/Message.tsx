import classes from "./Message.module.scss";
import { MessageModel } from "../../../../types/support-chat.type";
import { Box, ListItem, Typography } from "@mui/material";
import { dateUtilService } from "../../../../utils/date.utils";

type MessageProps = {} & MessageModel;

export const Message = ({
  content,
  isUserSender,
  senderName,
  createdAt,
}: MessageProps) => {
  return (
    <ListItem
      className={`${classes.message} ${
        !isUserSender ? classes.message__my_message : ""
      }`}
    >
      <Box className={classes.message__data}>
        <Box component="span" className={classes.message__data__sender}>
          {senderName}
        </Box>
        <Box component="span" className={classes.message__data__date}>
          {dateUtilService.formatTime(createdAt)}
        </Box>
      </Box>

      <Box className={classes.message__content}>
        <Typography variant="body1">{content}</Typography>
      </Box>
    </ListItem>
  );
};
