import bcrpyt from 'bcrypt'
import JWT from 'jsonwebtoken'
// import dotenv from "dotenv"
// dotenv.config()


let users

export default class AuthDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }

        try {
            users = await conn.db(process.env.WALLET_TRACKER).collection("users")
        } catch (error) {
            console.error(
                `Unable to establish a connection handle in authDAO: ${error}`
            )
        }
    }


    static async login(username, password) {
        try {
            console.log(username, password)
            let account = await users.find({
                username: username
            }).toArray()

            let token = false;

            let match = bcrpyt.compareSync(password, account[0].password)

            if (match) {
                token = JWT.sign(
                    {
                        username: account[0].username
                    },
                    process.env.SECRET
                )
            }

            return token

        } catch (error) {
            console.error(
                `Unable to find user`
            )
            return false
        }
    }

    static async logout() {
        try {
            localStorage.removeItem("user")
            navigate("/login")
        } catch (error) {
            console.error("unable to logout ", error)
        }
    }

}