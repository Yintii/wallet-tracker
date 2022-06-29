import AuthDAO from "../dao/authDAO.js";

export default class AuthController {
    static async apiPostLogin(req, res, next) {
        try {
            const username = req.body.username;
            const password = req.body.password;


            const user = await AuthDAO.login(username, password);

            res.json({ status: "success", message: "logged in", user: user })
        } catch (error) {
            res.status(500).json({ error: error.message, user: false })
        }
    }

    static async apiGetLogout(req, res, next) {
        try {
            await AuthDAO.logout();
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}