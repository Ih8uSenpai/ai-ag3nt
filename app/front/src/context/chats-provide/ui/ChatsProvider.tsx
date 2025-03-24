import { createContext, PropsWithChildren, useContext } from "react";
import { chats } from "../../../api/chats";

const ChatsContext = createContext<(typeof chats)[number][]>([]);

export const useChatsProvides = () => {
  const chats = useContext(ChatsContext);

  if (!chats) {
    throw new Error("Чаты не найдены");
  }

  return chats;
};

export const ChatsProvider = (props: PropsWithChildren) => {
  return (
    <ChatsContext.Provider value={chats}>
      {props.children}
    </ChatsContext.Provider>
  );
};
