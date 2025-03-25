// src/api/hooks/useSendRequirement.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface MCPInput {
  text?: string;
  file?: string;
}

interface MCPRequest {
  type: string;
  input: MCPInput;
  context?: {
    session_id: string;
  };
}

interface UserStory {
  title: string;
  description: string;
}

type MCPResponse =
  | { user_stories: UserStory[] }
  | { clarification_needed: string };

export const useSendRequirement = () => {
  return useMutation<MCPResponse, unknown, { text: string; sessionId: string }>(
    {
      mutationFn: async ({ text, sessionId }) => {
        // Отправляем данные с полем "task"
        const req = { task: text, session_id: sessionId };

        const res = await axios.post(
          "http://127.0.0.1:5000/api/decompose",
          req,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        return res.data;
      },
    }
  );
};
