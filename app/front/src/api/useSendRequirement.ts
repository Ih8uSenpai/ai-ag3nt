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
        const req: MCPRequest = {
          type: "user_requirement_decomposition",
          input: { text },
          context: { session_id: sessionId },
        };
        const res = await axios.post("http://localhost:8000/mcp", req, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        return res.data;
      },
    }
  );
};
