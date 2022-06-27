import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import AccountsDAO from './dao/accountsDAO.js'
import WalletsDAO from './dao/walletsDAO.js'
dotenv.config()

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    },
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await AccountsDAO.injectDB(client)
        await WalletsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })