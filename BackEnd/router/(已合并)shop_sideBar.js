const express = require("express")
const router = express()
const path = require("path")

let ShopSideBar = require(path.resolve(__dirname, "../data/shop_sideBar.json"))

router.get("/api/shopSideBar/:id", (req, res, next) => {

    const sideBar = ShopSideBar.find(item => item.id === req.params.id)
    if (sideBar) {
        res.send({
            status: "ok",
            data: sideBar
        })
    } else {
        res.status(403).send({
            status: "error",
            data: "未匹配到结果"
        })
    }


})


module.exports = router