import ChatItem from "@fullstack-chat-app/shared";
import User from "@fullstack-chat-app/shared";
import { loadAllChatItems, saveChatItem, deleteChatItem } from "../models/chats-repository";
import express, { Request, Response } from "express";
import { loadChats, saveChat } from "../services/chats-services";

const chatsController = express.Router();

chatsController.get("/", async (req: Request, res: Response<ChatItem[]>) => {
  res.send(await loadChats());
});

chatsController.post(
  "/",
  async (req: Request<ChatItem>, res: Response<ChatItem[]>) => {
    try {
      res.send(await saveChat(req.body));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);

chatsController.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<ChatItem[]>) => {
    const id = req.params.id;
    const deleted = await deleteChatItem(id);
    const chatItems = await loadAllChatItems();
    res.send(chatItems);
  }
);

// chatsController.put(
//   "/:id",
//   async (req: Request<{ id: string }>, res: Response<ChatItem[]>) => {
//     const id = req.params.id;
//     const chatItem = req.body;
//     const updated = await updateChatItem(id, chatItem);
//     const chatItems = await loadAllChatItems();
//     res.send(chatItems);
//   }
// );


// CREATE USER
chatsController.post("/register", async (req: Request<User>, res: Response<User>) => {
  try {
    res.send(await saveChat(req.body));
  } catch (e) {
    res.sendStatus(400);
  }
});





export default chatsController;
