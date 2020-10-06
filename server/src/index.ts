require('dotenv').config({ path: '../.config/.env' })
import * as dotenv from "dotenv"
import * as express from "express"
import { Request, Response } from "express"
import * as bodyParser from "body-parser"

dotenv.config({ path: '../.config/.env' })

const app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api', (req: Request, res: Response) => res.json({'hello': 'world'}))

app.listen(PORT)

console.log(`Express application is up and running on port ${PORT}`)