import { create } from "zustand";

type State = {
  chat: number | undefined;
};

type Action = {
  setChat: (index: number) => void;
};

export const useChatStore = create<State & Action>()((set) => ({
  chat: undefined,
  setChat: (index) => set(() => ({ chat: index })),
}));
