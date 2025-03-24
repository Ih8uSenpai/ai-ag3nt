import { useState } from "react";

import { Chat } from "./widgets/chat";
import { History } from "./widgets/history";
import { Box } from "@mui/material";
import React from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <History />
      <Chat />
    </>
  );
}

export default App;
