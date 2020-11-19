const axios = require("axios")
const debug = require("debug")("app:geocode")

module.exports = (address) => {
  return new Promise((resolve, reject) => {
    if (!address || !process.env.GOOGLE_KEY) {
      resolve("no address or google apikey.")
    }
    (async function () {
      const URL = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_KEY}`)
      debug(URL)
      const { data } = await axios.get(URL)
      resolve(data)
    }())
  })
}