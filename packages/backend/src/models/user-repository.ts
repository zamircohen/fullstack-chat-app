import mongoose from "mongoose";
import UserItem from "@fullstack-chat-app/shared/src/user-item"; 

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const UserModel = mongoose.model<UserItem>("UserItem", UserSchema);

export const setupMongoDb = async (url: string) => {
    await mongoose.connect(url);
}

export const loadAllUserItems = async (): Promise<UserItem[]> => {
    return await UserModel.find({}).exec();
}

export const saveUserItem = async (userItem: UserItem): Promise<void> => {
    const newUser = new UserModel(userItem);
    newUser.save();
}

export const deleteUserItem = async (id: string): Promise<void> => {
    await UserModel.deleteOne({ _id: id });
}
