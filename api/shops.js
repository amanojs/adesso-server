const express = require("express")
const shopRouter = express.Router()
const client = require("./config/mysql")()
const geocoder = require("./config/geocoder")
const debug = require("debug")("app:shops")

const getRate = (shopId) => {
    return new Promise((resolve, reject) => {
        const sql =
            "SELECT shop_id,truncate(AVG(taste),1),truncate(AVG(price),1),truncate(AVG(service),1),truncate(AVG(atmosphere),1),truncate(AVG(speed),1) FROM t_reviews WHERE shop_id = 4 GROUP BY shop_id;"
        //select shop_id,avg(taste) from t_reviews group by shop_id having avg(taste) > 4.6;
    })
}

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

    shopRouter.route("/postReview").post((req, res) => {
        const shopId = req.body.shopId
        const userId = req.body.userId
        const postedAt = "2020/11/20 16:35"
        const taste = req.body.taste
        const price = req.body.price
        const service = req.body.service
        const atmosphere = req.body.atmosphere
        const speed = req.body.speed
        const about = req.body.about
        const sql = "INSERT INTO t_reviews VALUES(null,?,?,?,?,?,?,?,?,?);"
        const placeholder = [shopId, userId, postedAt, taste, price, service, atmosphere, speed, about]
        client.query(sql, placeholder, (err, result) => {
            if (err) {
                throw err
            }
            debug(result)
            res.json(result)
        })
    })

    shopRouter.route("/searchFeature").post((req, res) => {
        const taste = req.body.taste
        const price = req.body.price
        const service = req.body.service
        const atmosphere = req.body.atmosphere
        const speed = req.body.speed
        const sql = "SELECT shop_id FROM t_reviews GROUP BY shop_id HAVING avg(taste) > ? AND avg(price) > ? AND avg(service) > ? AND avg(atmosphere) > ? AND avg(speed) > ?;"
    })

    return shopRouter
}