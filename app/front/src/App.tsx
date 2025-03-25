import { useState } from "react";

import { Chat } from "./widgets/chat";
import { History } from "./widgets/history";
import { Box } from "@mui/material";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <History />
      <Chat />
    </QueryClientProvider>
  );
}

export default App;
