import express, { Application, json, Request, Response } from 'express';
import dotenv from 'dotenv';
import {setupMongoDb} from './db';
import cors from 'cors';

dotenv.config()

const app: Application = express()
app.use(cors()) 
app.use(json())
const port: number = parseInt(process.env.SERVER_PORT || '3001')
const mongoURL: string = process.env.MONGO_URL || 'mongodb://localhost:27017/chat'

app.use("/chats", todosController)

app.listen(port, async function() {
    await setupMongoDb(mongoURL)
    console.log('App is running on port ' + port)
})
