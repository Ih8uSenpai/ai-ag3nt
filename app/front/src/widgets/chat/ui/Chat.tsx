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
  const data = chat ? chats[chat] : undefined;

  if (!data) return "Новый чат";

  return (
    <Box flexGrow={1} width={"100%"} display={"flex"} flexDirection={"column"}>
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

  const handleSend = (e) => {
    const input = inputValue;

    const newMessage = {
      owner: "user",
      text: input,
    } as const;

    if (chatIndex) {
      addMsg(chatIndex, newMessage);
    }

    if (input.trim()) {
      mutate(
        { text: input, sessionId: Math.random().toString() },
        {
          onSuccess: (res) => {
            if ("clarification_needed" in res) {
              console.log([
                {
                  sender: "agent" as const,
                  content: res.clarification_needed,
                },
              ]);
            } else if ("user_stories" in res) {
              res.user_stories.forEach((s) => {
                const res = {
                  owner: "agent",
                  text: `📝 ${s.title}: ${s.description}`,
                } as const;
                console.log(res);
                if (chatIndex) {
                  addMsg(chatIndex, res);
                }
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
                <Upload cursor={"pointer"} color="white" />
                <SendHorizontal
                  cursor={"pointer"}
                  color="white"
                  onClick={handleSend}
                />
              </InputAdornment>
            ),
          },
        }}
      ></TextField>
    </Box>
  );
};
