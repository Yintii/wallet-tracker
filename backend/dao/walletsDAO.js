import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let wallets

export default class WalletsDAO {
    static async injectDB(conn) {
        if (wallets) {
            return
        }

        try {
            wallets = await conn.db(process.env.WALLET_TRACKER).collection("Wallets")
        } catch (e) {
            console.error(
                `Unable to establish a connection handles in walletDAO: ${e}`
            )
        }
    }

    static async addWallet(associatedAccount, name, type, xpub) {
        try {
            const walletDoc = {
                walletName: name,
                walletType: type,
                walletXpub: xpub,
                account_id: ObjectId(associatedAccount)
            }
            return await wallets.insertOne(walletDoc)
        } catch (e) {
            console.error(
                `Unable to add wallet to associated account: ${e}`
            )
        }
    }

}