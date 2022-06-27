import express from 'express'
import cors from 'cors'
import routes from './api/app.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/accounts", routes);

app.use("*", (req, res) => res.status(404).json({ error: "Not found" }))

export default app

