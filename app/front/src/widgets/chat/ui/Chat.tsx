import { Box, InputAdornment, TextField, Typography } from "@mui/material";

import { SendHorizontal, Upload } from "lucide-react";
import { useChatStore } from "../../../context/stores/chat";
import { chats } from "../../../api/chats";
import { useShallow } from "zustand/shallow";
import React from "react";

const UserMsg = ({ text }: { text: string }) => (
  <Typography
    sx={{
      maxWidth: "40%",
      alignSelf: "flex-end",
      bgcolor: "background.paper",
      p: 1,
      borderRadius: 1,
    }}
  >
    {text}
  </Typography>
);

const AgentMsg = ({ text }: { text: string }) => (
  <Typography
    sx={{
      maxWidth: "40%",
      alignSelf: "flex-start",
      p: 1,
    }}
  >
    {text}
  </Typography>
);

const Msg = ({
  message: { text, owner },
}: {
  message: { text: string; owner: "user" | "agent" };
}) => (
  <> {owner === "agent" ? <AgentMsg text={text} /> : <UserMsg text={text} />}</>
);

const Messages = () => {
  const chat = useChatStore((state) => state.chat);
  const data = chats[chat ?? 0];

  return (
    <Box flexGrow={1} width={"100%"} display={"flex"} flexDirection={"column"}>
      {data.msg.map((msg) => (
        <Msg message={msg as any} />
      ))}
    </Box>
  );
};

export const Chat = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      p={2}
      flexGrow={1}
      flexDirection={"column"}
      bgcolor={"background.default"}
      borderRadius={"0 10px 10px 0"}
      sx={{ opacity: 1 }}
    >
      <Messages />
      <TextField
        variant="outlined"
        placeholder="Запрос"
        sx={{ width: "50%", bgcolor: "background.paper", border: "none" }}
        slotProps={{
          input: {
            style: { color: "white", border: "none" },
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ display: "flex", columnGap: 2 }}
              >
                <Upload cursor={"pointer"} color="white" />
                <SendHorizontal cursor={"pointer"} color="white" />
              </InputAdornment>
            ),
          },
        }}
      ></TextField>
    </Box>
  );
};
