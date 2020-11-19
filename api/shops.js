const express = require("express")
const shopRouter = express.Router()
const client = require("./config/mysql")()
const geocoder = require("./config/geocoder")
const debug = require("debug")("app:shops")

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

    shopRouter.route("/getNearShops").get((req, res) => {
        const sql = "SELECT * FROM m_shops;"
    })

    shopRouter.route("/searchShops").get((req, res) => {
        geocoder("愛知県").then((data) => {
            debug(data)
            res.json(data.results[0].geometry.bounds)
        }).catch(err => {
            debug(err)
        })
    })
    return shopRouter
}