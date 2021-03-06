import AccountsDAO from "../dao/accountsDAO.js";

export default class AccountsController {
    static async apiGetAllAccounts(req, res, next) {
        const accountsPerPage = req.query.accountsPerPage ? parseInt(req.query.accountsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        const { accountsList, totalNumAccounts } = await AccountsDAO.getAccounts({
            page,
            accountsPerPage
        })

        let response = {
            accountsList: accountsList,
            page: page,
            entriesPerPage: accountsPerPage,
            total_results: totalNumAccounts
        }
        res.json(response);
    }

    static async apiGetAccountById(req, res, next) {
        try {
            let id = req.params.id || {}
            let account = await AccountsDAO.getAccountById(id)
            if (!account) {
                res.status(404).json({ error: "Not Found" })
                return
            }
            res.json(account)
        } catch (e) {
            console.error(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}