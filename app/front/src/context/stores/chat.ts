import { create } from "zustand";

type State = {
  chat: number | undefined;
  chats: { label: string; msg: { owner: "agent" | "user"; text: string }[] }[];
};

type Action = {
  setChat: (index: number) => void;
  addChat: () => void;
  addMsg: (
    index: number,
    msg: {
      owner: "agent" | "user";
      text: string;
    }
  ) => void;
};

export const useChatStore = create<State & Action>()((set, get) => ({
  chat: undefined,
  chats: [],
  setChat: (index) => set(() => ({ chat: index })),
  addMsg: (index, msg) => {
    set(({ chats }) => ({
      chats: chats.map((chat, i) =>
        index === i
          ? { ...chat, msg: [...chat.msg, msg] } // Создаем новый массив msg
          : chat
      ),
    }));
  },
  addChat: () =>
    set(({ chats }) => ({ chats: [{ label: "Новый", msg: [] }, ...chats] })),
}));
