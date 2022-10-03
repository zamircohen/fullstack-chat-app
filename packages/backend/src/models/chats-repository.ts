import ChatItem from "@fullstack-chat-app/shared";
import { connect, model, Schema } from "mongoose";

const ChatSchema = new Schema({
  text: String,
  timeStamp: Date,
});

const ChatModel = model<ChatItem>("TodoItem", ChatSchema);

export const setupMongoDb = async (url: string) => {
  await connect(url);
};

export const loadAllTodoItems = async (): Promise<ChatItem[]> => {
  return await ChatModel.find({}).exec();
};

export const saveTodoItem = async (chatItem: ChatItem): Promise<void> => {
  const newModel = new ChatModel(chatItem);
  newModel.save();
};

export const deleteTodoItem = async (id: string): Promise<void> => {
  await ChatModel.deleteOne({ _id: id });
};

export const updateTodoItem = async (
  id: string,
  chatItem: ChatItem
): Promise<void> => {
  await ChatModel.updateOne({ _id: id }, chatItem);
};
