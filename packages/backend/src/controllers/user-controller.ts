import UserItem from "@fullstack-chat-app/shared/src/user-item";
import { loadAllUserItems } from "../models/user-repository";

export const loadUsers = async (): Promise<UserItem[]> => {
    return await loadAllUserItems();
}

import { Request, Response } from "express";
import { loadUsers } from "../services/user-services";

export const getUsers = async (req: Request, res: Response<UserItem[]>) => {
    res.send(await loadUsers());
}

import express from "express";
import { getUsers } from "../controllers/user-controller";

const userController = express.Router();

userController.get("/", getUsers);

export default userController;

