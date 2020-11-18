const mysql = require("mysql")
const debug = require("debug")("app:mysql-connect")

module.exports = () => {
    const db_config = {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "user",
        password: process.env.DB_PASS || "password",
        database: process.env.DB_NAME || "adesso"
    }
    debug(db_config)
    const client = mysql.createConnection(db_config)
    client.connect((err) => {
        if (err) {
            throw err
        }
        debug("mysql connected.")
    })
    return client
}