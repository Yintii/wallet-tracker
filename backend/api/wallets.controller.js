import WalletsDAO from "../dao/walletsDAO.js"

export default class WalletsController {
    static async apiPostWallet(req, res, next) {
        try {
            const accountId = req.body.account_id
            const walletName = req.body.name
            const walletType = req.body.type
            const walletXPub = req.body.xpub

            await WalletsDAO.addWallet(
                accountId,
                walletName,
                walletType,
                walletXPub
            )
            res.json({ status: "Success" })
        } catch (error) {
            res.status(500).json({ error: error.message })

        }
    }
}