import ChatItem from "@fullstack-chat-app/shared";
import { connect, model, Schema } from "mongoose";

const ChatSchema = new Schema({
  user: String,
  text: String,
  timeStamp: Date,
});

const ChatModel = model<ChatItem>("ChatItem", ChatSchema);

export const setupMongoDb = async (url: string) => {
  await connect(url);
};

export const loadAllChatItems = async (): Promise<ChatItem[]> => {
  return await ChatModel.find({}).exec();
};

export const saveChatItem = async (chatItem: ChatItem): Promise<void> => {
  const newModel = new ChatModel(chatItem);
  newModel.save();
};

export const deleteChatItem = async (id: string): Promise<void> => {
  await ChatModel.deleteOne({ _id: id });
};
