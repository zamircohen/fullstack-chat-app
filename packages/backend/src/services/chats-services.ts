import ChatItem from "@fullstack-chat-app/shared";
import { loadAllChatItems, saveChatItem } from "../models/chats-repository";

export const saveChat = async (chatItem: ChatItem): Promise<ChatItem[]> => {
  if (!chatItem.text || chatItem.text === "") {
    throw new Error("Invalid text on todo item!");
  }
  chatItem.timeStamp = new Date();
  await saveChatItem(chatItem);
  return await loadAllChatItems();
};

export const loadChats = async (): Promise<ChatItem[]> => {
  return await loadAllChatItems();
};

