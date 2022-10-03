import express, { Application, json, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express()
app.use(cors())
app.use(json())
const port: number = parseInt(process.env.SERVER_PORT || '3001')

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
})
