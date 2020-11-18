const express = require("express")
const shopRouter = express.Router()
const client = require("./config/mysql")()

module.exports = () => {
    shopRouter.route("/getShops").get((req, res) => {
        const sql = "SELECT * FROM m_shops;"
        client.query(sql, (err, result) => {
            if (err) {
                throw err
            }
            res.json(result)
        })
    })
    return shopRouter
}