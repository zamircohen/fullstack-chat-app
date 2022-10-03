import TodoItem from "@fullstack-chat-app/shared";
import { loadAllTodoItems, saveTodoItem } from "../models/chats-repository";

export const saveTodo = async (todoItem : ChatItem): Promise<ChatItem[]> => {
    if (!todoItem.text || todoItem.text === "") {
        throw new Error('Invalid text on todo item!')       
      } 
      todoItem.timeStamp = new Date();
      await saveTodoItem(todoItem);
      return await loadAllChatItems();
    }

export const loadTodos = async (): Promise<ChatItem[]> => {
    return await loadAllTodoItems();
}