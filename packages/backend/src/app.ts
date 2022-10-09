import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupMongoDb } from "./models/chats-repository";
import chatsController from "./controllers/chats-controller";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(json());
const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoURL: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/mychats";

app.use("/chats", chatsController);

app.listen(port, async function () {
  await setupMongoDb(mongoURL);
  console.log(`App is listening on port ${port}`);
});
