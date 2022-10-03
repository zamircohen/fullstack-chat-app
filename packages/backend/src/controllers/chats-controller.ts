import ChatItem from "@fullstack-chat-app/shared";
import { loadAllTodoItems, saveTodoItem, deleteTodoItem, updateTodoItem} from "../models/chats-repository";
import express, { Request, Response } from "express";
import { loadTodos, saveTodo } from "../services/todos-services";

const todosController = express.Router();

todosController.get("/", async (req: Request, res: Response<ChatItem[]>) => {
  res.send(await loadChats());
});

todosController.post(
  "/",
  async (req: Request<ChatItem>, res: Response<ChatItem[]>) => {
    try {
      res.send(await saveTodo(req.body));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);

todosController.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<ChatItem[]>) => {
    const id = req.params.id;
    const deleted = await deleteChatItem(id);
    const todoItems = await loadAllChatItems();
    res.send(todoItems);
  }
);

todosController.put(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<ChatItem[]>) => {
    const id = req.params.id;
    const todoItem = req.body;
    const updated = await updateChatItem(id, todoItem);
    const todoItems = await loadAllChatItems();
    res.send(todoItems);
  }
);

export default todosController;
