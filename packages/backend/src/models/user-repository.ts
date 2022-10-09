import User from "@fullstack-chat-app/shared";
import { connect, model, Schema } from "mongoose";

const UserSchema = new Schema({
  user: String,
  text: String,
//   timeStamp: Date,
});

const UserModel = model<UserItem>("ChatItem", UserSchema);

export const setupMongoDb = async (url: string) => {
  await connect(url);
};

export const loadAllChatItems = async (): Promise<UserItem[]> => {
  return await UserModel.find({}).exec();
};

export const saveUser = async (userItem: UserItem): Promise<void> => {
  const newModel = new UserModel(userItem);
  newModel.save();
};

export const deleteUser = async (id: string): Promise<void> => {
    await UserModel.deleteOne({ _id: id });
};


    
