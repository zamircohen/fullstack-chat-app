import { loadAllUserItems, saveUserItem } from "../models/user-repository";
import UserItem from "@fullstack-chat-app/shared/src/user-item";

export const saveUser = async (userItem: UserItem): Promise<UserItem[]> => {
    if (!userItem.user || userItem.user === "") {
        throw new Error("Invalid username on user item!");
    }
    if (!userItem.password || userItem.password === "") {
        throw new Error("Invalid password on user item!");
    }
    await saveUserItem(userItem);
    return await loadAllUserItems();
}

