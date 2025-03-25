import { Box, InputAdornment, TextField, Typography } from "@mui/material";

import { SendHorizontal, Upload } from "lucide-react";
import { useChatStore } from "../../../context/stores/chat";
import { chats } from "../../../api/chats";
import { useShallow } from "zustand/shallow";
import React, { useState } from "react";
import { useSendRequirement } from "../../../api/useSendRequirement";

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
  const chats = useChatStore((state) => state.chats);
  const data = chat !== undefined ? chats[chat] : undefined;

  if (!data) return "Новый чат";

  console.log({ chats });

  return (
    <Box
      flexGrow={1}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      overflow={"scroll"}
    >
      {data.msg.map((msg) => (
        <Msg message={msg as any} />
      ))}
    </Box>
  );
};

export const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const { mutate } = useSendRequirement();
  const addMsg = useChatStore((state) => state.addMsg);
  const chatIndex = useChatStore((state) => state.chat);

  const handleSend = () => {
    const input = inputValue;

    const newMessage = {
      owner: "user",
      text: input,
    } as const;

    console.log({ newMessage, chatIndex });
    if (chatIndex !== undefined) {
      addMsg(chatIndex, newMessage);
    }

    if (input.trim()) {
      mutate(
        { text: inputValue, sessionId: Math.random().toString() },
        {
          onSuccess: (res) => {
            // Используем res.response, так как API возвращает именно это поле

            if (chatIndex !== undefined) {
              addMsg(chatIndex, {
                owner: "agent",
                text: (res as any).response,
              });
            }
          },
          onError: () => {
            if (chatIndex !== undefined) {
              addMsg(chatIndex, {
                owner: "agent",
                text: "Ошибка при отправке сообщения",
              });
            }
          },
        }
      );
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
                {/* <Upload cursor={"pointer"} color="white" /> */}
                <SendHorizontal
                  cursor={"pointer"}
                  color="white"
                  onClick={() => handleSend()}
                />
              </InputAdornment>
            ),
          },
        }}
      ></TextField>
    </Box>
  );
};
