import express from "express"
import AccountCtrl from "./accounts.controller.js"
import WalletsCtrl from "./wallets.controller.js"

const router = express.Router()

router.route("/check").get(AccountCtrl.apiGetAllAccounts)

router.route("/id/:id").get(AccountCtrl.apiGetAccountById)

router.route("/add").post(WalletsCtrl.apiPostWallet)


export default router;