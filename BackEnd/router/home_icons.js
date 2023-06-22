const express = require("express")
const router = express()
const path = require("path")

let HomeIcons = require(path.resolve(__dirname, "../data/home_icons.json"))

router.get("/api/homeIcons", (req, res, next) => {
    res.send({
        status: "ok",
        data: HomeIcons
    })
})


module.exports = router