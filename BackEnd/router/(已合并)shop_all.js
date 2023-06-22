const express = require("express")
const router = express()
const path = require("path")

let ShopAll = require(path.resolve(__dirname, "../data/shop_all.json"))

router.get("/api/shopAll/:id", (req, res, next) => {
    console.log(req.query, req.params)
    const id = req.params.id
    const tab = req.query.tab
    // if (id && tab) {
    if (id) {
        // const data = ShopAll.find(item => item.id === id && item[tab])  // json文件中的数组键名
        const data = ShopAll.find(item => item.id === id)  // json文件中的数组键名
        // const shopTab = data[tab]
        const shopTab = data
        res.send({
            status: "ok",
            data: shopTab
        })
        console.log(shopTab)
    } else {
        res.send({
            status: "error",
            data: "未知 ID 或 tab"
        })
    }

})


module.exports = router