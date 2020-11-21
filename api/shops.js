const express = require("express")
const shopRouter = express.Router()
const client = require("./config/mysql")()
const geocoder = require("./config/geocoder")
const debug = require("debug")("app:shops")

const getRate = (shopId) => {
    return new Promise((resolve, reject) => {
        const sql =
            "SELECT truncate(AVG(taste),1) as taste,truncate(AVG(price),1) as price,truncate(AVG(service),1) as service,truncate(AVG(atmosphere),1) as atmosphere,truncate(AVG(speed),1) as speed FROM t_reviews WHERE shop_id = ? GROUP BY shop_id;"
        client.query(sql, [shopId], (err, result) => {
            if (err) {
                throw err
            }
            resolve(result)
        })
        //select shop_id,avg(taste) from t_reviews group by shop_id having avg(taste) > 4.6;
    })
}

const getRateByMonth = (shopId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT DATE_FORMAT(posted_at,'%Y-%m') as date,truncate(AVG(taste),1) as taste,truncate(AVG(price),1) as price,truncate(AVG(service),1) as service,truncate(AVG(atmosphere),1) as atmosphere,truncate(AVG(speed),1) as speed FROM t_reviews WHERE shop_id = ? GROUP BY DATE_FORMAT(posted_at,'%Y-%m')"
        client.query(sql, [shopId], (err, result) => {
            if (err) {
                throw err
            }
            resolve(result)
        })
    })
}

module.exports = () => {
    shopRouter.route("/getShop").get((req, res) => {
        if (!("shopId" in req.query)) {
            res.json({ status: "error", message: "no param" })
        }
        const shopId = req.query.shopId
        const sql = "SELECT m_shops.shop_id,shop_name,GROUP_CONCAT(tag) as tags FROM m_shops LEFT OUTER JOIN t_tags ON m_shops.shop_id = t_tags.shop_id WHERE m_shops.shop_id = ? GROUP BY m_shops.shop_id;"
        client.query(sql, [shopId], (err, result) => {
            if (err) {
                throw err
            }
            const resData = []
            let rateByMonthPromise = Promise.resolve()
            let graphPromise = Promise.resolve()
            if (result.length === 0) {
                return res.json({ status: "error", message: "no data" })
            }
            rateByMonthPromise = rateByMonthPromise.then(getRateByMonth.bind(this, result[0].shop_id)).then((data) => {
                resData.push({ ...result[0], rateByMonth: data })
            })
            rateByMonthPromise.then(() => {
                return new Promise((resolve, reject) => {
                    graphPromise = graphPromise.then(getRate.bind(this, resData[0].shop_id)).then((data) => {
                        resData[0] = { ...resData[0], graphData: data }
                        res.json(resData[0])
                        resolve()
                    })
                })
            })
        })
    })

    shopRouter.route("/getNearShops").get((req, res) => {
        const sql = "SELECT * FROM m_shops;"
    })

    shopRouter.route("/getFavShops").get((req, res) => {
        const sql = "SELECT MAX(m_shops.shop_id),truncate(AVG(taste) + AVG(price) + AVG(service) + AVG(atmosphere) + AVG(speed),1) as sumall, (SELECT about FROM t_reviews WHERE shop_id = m_shops.shop_id ORDER BY taste + price + service + atmosphere + speed LIMIT 1) as review FROM m_shops INNER JOIN t_reviews ON m_shops.shop_id = t_reviews.shop_id GROUP BY m_shops.shop_id ORDER BY AVG(taste) + AVG(price) + AVG(service) + AVG(atmosphere) + AVG(speed) DESC LIMIT 3"
    })

    shopRouter.route("/searchShops").get((req, res) => {
        const area = String(req.query.area)
        let tags = []
        if ("tags" in req.query) {
            const tags_str = String(req.query.tags)
            tags = tags_str.split(",")
        }
        geocoder(area).then((data) => {
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
            let sql = ""
            if (tags.length) {
                sql = "SELECT COUNT(tag),(MAX(m_shops.shop_id)) as shop_id,(MAX(m_shops.shop_name)) as shop_name,(SELECT GROUP_CONCAT(tag) FROM t_tags WHERE shop_id = m_shops.shop_id GROUP BY shop_id) as tags FROM m_shops INNER JOIN t_tags ON t_tags.shop_id = m_shops.shop_id WHERE latitude < ? AND latitude > ? AND longitude < ? AND longitude > ?"
                for ([i, tag] of tags.entries()) {
                    if (i === 0) {
                        sql += ` AND t_tags.tag LIKE '%${tag}%'`
                    } else {
                        sql += ` OR t_tags.tag LIKE '%${tag}%'`
                    }
                }
                sql += ` GROUP BY m_shops.shop_id HAVING COUNT(tag) = ${tags.length}`
                debug(sql)
            } else {
                sql = "SELECT m_shops.shop_id,m_shops.shop_name,GROUP_CONCAT(t_tags.tag) as tags FROM m_shops LEFT OUTER JOIN t_tags ON t_tags.shop_id = m_shops.shop_id WHERE latitude < ? AND latitude > ? AND longitude < ? AND longitude > ? GROUP BY m_shops.shop_id"
            }
            debug(sql)
            client.query(sql, [...com.lat, ...com.lon], (err, result) => {
                if (err) {
                    throw err
                }
                const resData = []
                let myPromise = Promise.resolve()
                for (let i = 0; i < result.length; i++) {
                    myPromise = myPromise.then(getRate.bind(this, result[i].shop_id)).then((data) => {
                        resData.push({ ...result[i], graphData: data })
                    })
                }
                myPromise.then(() => {
                    return new Promise((resolve, reject) => {
                        res.json(resData)
                        resolve()
                    })
                })
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
        const sql = "SELECT t_reviews.shop_id as shop_id,address,m_shops.shop_name FROM t_reviews INNER JOIN m_shops ON t_reviews.shop_id = m_shops.shop_id GROUP BY shop_id HAVING avg(taste) >= ? AND avg(price) >= ? AND avg(service) >= ? AND avg(atmosphere) >= ? AND avg(speed) >= ?;"
        const placeholder = [taste, price, service, atmosphere, speed]
        client.query(sql, placeholder, (err, result) => {
            if (err) {
                throw err
            }
            debug(result)
            const resData = []
            let myPromise = Promise.resolve()
            for (let i = 0; i < result.length; i++) {
                myPromise = myPromise.then(getRate.bind(this, result[i].shop_id)).then((data) => {
                    resData.push({ ...result[i], graphData: data })
                })
            }
            myPromise.then(() => {
                return new Promise((resolve, reject) => {
                    res.json(resData)
                    resolve()
                })
            })
        })
    })

    return shopRouter
}