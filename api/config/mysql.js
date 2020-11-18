const mysql = require("mysql")
const debug = require("debug")("app:mysql-connect")

module.exports = () => {
    const client = mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.USER_NAME || "user",
        password: process.env.DB_PASS || "password",
        database: process.env.DB_NAME || "adesso"
    })
    client.connect((err) => {
        if (err) {
            throw err
        }
        debug("mysql connected.")
    })
    return client
}