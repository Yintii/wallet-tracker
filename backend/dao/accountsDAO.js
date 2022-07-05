import { response } from "express"
import mongodb from "mongodb"
import fetch from 'node-fetch'
const ObjectId = mongodb.ObjectId



let accounts

export default class AccountsDAO {
    static async injectDB(conn) {
        if (accounts) {
            return
        }
        try {
            accounts = await conn.db(process.env.WALLET_TRACKER).collection("Accounts")
            console.log("successfully connected to accounts in the database")
        } catch (error) {
            console.log(
                `Unable to establish a collection handle in AccountsDAO: ${error}`
            )
        }
    }

    static getID(str) {
        const matches = str.split('"');
        return matches[1] ? matches[1] : str;
    }


    static async addAccount(name) {
        try {
            const accountDoc = {
                accountName: name,
            }
            return await accounts.insertOne(accountDoc)
        } catch (e) {
            console.error(
                `Unable to add account to database: ${e}`
            )
        }
    }

    static async getAccounts({
        page = 0,
        accountsPerPage = 20,
    } = {}) {
        let query
        let cursor

        try {
            cursor = await accounts.find({})
        } catch (e) {
            console.log(`Unable to issue command: ${e}`)
            return { accountsList: [], totalNumAccounts: 0 }
        }

        const displayCursor = cursor.limit(accountsPerPage).skip(accountsPerPage * page)

        try {
            const accountsArray = await displayCursor.toArray()
            const totalNumAccounts = await accounts.countDocuments(query)

            const accountsPromises = accountsArray.map(async account => {
                let data = await this.getAccountById(this.getID(account._id.toString()))
                return data;
            })

            let accountsList = await Promise.all(accountsPromises)

            // let accountsList = await this.getWalletBalances(_accountsList)



            return { accountsList, totalNumAccounts }
        } catch (err) {
            console.error(`Unable to convert cursor to array or problem counting documents: ${err}`)
            return { accountsList: [], totalNumAccounts: 0 }
        }
    }

    static async getWalletBalances(_accountsList) {
        try {
            let accountPromises = _accountsList.map(async account => {
                let walletPromises = await account.wallets.map(async wallet => {
                    let balance = fetch(`https://btc1.trezor.io/api/v2/xpub/${wallet.walletXpub}`)
                        .then(async response => await response.json())
                        .then(data => data.balance)

                    return { ...wallet, balance: balance }
                })
                let wallets = await Promise.all(walletPromises)

                return { ...account, wallets: wallets }
            })
            let accountsList = await Promise.all(accountPromises);
            return accountsList
        } catch (error) {
            console.log(`Unable to fetch balances: ${error}`)
        }
    }


    static async getAccountById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "Wallets",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$account_id", "$$id"],

                                    },
                                },
                            },
                        ],
                        as: "wallets"
                    },
                },
                {
                    $addFields: {
                        wallets: "$wallets",
                    },
                },
            ]
            return await accounts.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getAccountsById: ${e}`)
            throw e
        }
    }
}