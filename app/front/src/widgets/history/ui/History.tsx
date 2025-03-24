import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { chats } from "../../../api/chats";
import { useChatStore } from "../../../context/stores/chat";

export const History = () => {
  const data = chats;
  const setChat = useChatStore((state) => state.setChat);

  return (
    <Box
      width={"25%"}
      height={"100%"}
      bgcolor={"background.paper"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        px: 1,
      }}
      borderRadius={"10px 0 0 10px"}
    >
      <Typography
        component={"h1"}
        sx={{
          mb: 1,
          fontWeight: "bold",
          fontSize: "1.9rem",
          color: "text.secondary",
        }}
      >
        ДекомпоZилла
      </Typography>
      <Button variant="contained" fullWidth sx={{ color: "black", bgcolor: 'text.secondary' }}>
        Новый чат
      </Button>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          width: "100%",
        }}
      >
        {data.map((chat, index) => (
          <Button
            variant="contained"
            fullWidth
            onClick={() => setChat(index)}
            sx={{ color: "white", bgcolor: "background.default" }}
          >
            {chat.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
