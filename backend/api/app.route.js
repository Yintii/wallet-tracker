import express from "express"
import AccountCtrl from "./accounts.controller.js"
import WalletsCtrl from "./wallets.controller.js"
import AuthCtrl from "./auth.controller.js"

const router = express.Router()

router.route("/check").get(AccountCtrl.apiGetAllAccounts)

router.route("/id/:id").get(AccountCtrl.apiGetAccountById)

router.route("/add/wallets").post(WalletsCtrl.apiPostWallet)

router.route("/add/account").post(AccountCtrl.apiPostAccount)

router.route("/login").post(AuthCtrl.apiPostLogin)

router.route("/logout").get(AuthCtrl.apiGetLogout)

export default router;