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
        geocoder("宮崎県").then((data) => {
            if (!("bounds" in data.geometry)) {
                res.json({ status: "error", msg: "無効なエリアです" })
            }
            const { bounds } = data.geometry
            debug(bounds)
            const com = { lat: {}, lon: {} }
            com.lat =
                bounds.northeast.lat > bounds.southwest.lat ?
                    [bounds.northeast.lat, bounds.southwest.lat] : [bounds.southwest.lat, bounds.northeast.lat]
            com.lon =
                bounds.northeast.lng > bounds.southwest.lng ?
                    [bounds.northeast.lng, bounds.southwest.lng] : [bounds.southwest.lng, bounds.northeast.lng]
            const sql =
                "SELECT * FROM m_shops WHERE latitude < ? AND latitude > ? AND longitude < ? AND longitude > ?;"
            client.query(sql, [...com.lat, ...com.lon], (err, result) => {
                if (err) {
                    throw err
                }
                res.json(result)
            })
        }).catch(err => {
            debug(err)
        })
    })
    return shopRouter
}