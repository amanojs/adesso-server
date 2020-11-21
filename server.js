const express = require("express")
const debug = require("debug")("app")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const chalk = require("chalk")
const dotenv = require("dotenv")
const morgan = require("morgan")
const path = require("path")

const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    secret: "adesso",
    resave: false,
    saveUninitialized: true
}))
app.use("/images", express.static(path.join(__dirname, "static", "images")))
dotenv.config()
const PORT = process.env.PORT || 23450

const shopRouter = require("./api/shops")()
app.use("/api/shops", shopRouter)

app.get("/", (req, res) => {
    debug("access")
    res.send("ok")
})

app.listen(PORT, () => {
    console.log(`server listen on ${chalk.yellow(PORT)} PORT.\nhttp://localhost:${PORT}`)
})