const express = require("express")
const shopRouter = express.Router()

module.exports = () => {
    shopRouter.route("/getShops").get((req, res) => {
        res.json({ test: "test" })
    })
    return shopRouter
}