const express = require("express")
const router = express()
const path = require("path")
const fs = require("fs/promises")
const jwt = require("jsonwebtoken")

// 引入数据 (转换为绝对路径)
let HomeShop = require(path.resolve(__dirname, "../data/home_shop.json"))
let Shop = require(path.resolve(__dirname, "../data/shop.json"))

// 首页的商品数据
router.get("/api/shop", (req, res, next) => {
    res.send({
        status: "ok",
        data: HomeShop
    })
})


// 店铺的数据
// 根据前端传过来的id 查找对应的商店
router.get("/api/shop/:id", (req, res, next) => {
    const shop = Shop.find((item) => item.id === req.params.id)
    if (shop) {
        res.send({
            status: "ok",
            data: shop
        })
    } else {
        res.status(403).send({
            status: "error",
            data: "未获取到数据"
        })
    }
})


// 店铺首页商品数据
let ShopHome = require(path.resolve(__dirname, "../data/shop_home.json"))

router.get("/api/shopHome/:id", (req, res, next) => {
    const id = req.params.id
    if (id) {
        const shopHome = ShopHome.find(item => item.id === id)
        res.send({
            status: "ok",
            data: shopHome
        })
        console.log(shopHome)
    } else {
        res.status(404).send({
            status: "error",
            data: "未匹配到对应id商店"
        })
    }
})


// 店铺全部商品侧边栏
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


// 店铺全部商品
let ShopAll = require(path.resolve(__dirname, "../data/shop_all.json"))

router.get("/api/shopAll/:id", (req, res, next) => {
    const id = req.params.id
    const tab = req.query.tab
    if (id && tab) {
        // if (id) {  // 注释掉的部分是返回未分类的数据 也就是全部数据 然后让前端分类
        // const data = ShopAll.find(item => item.id === id)  // json文件中的数组键名
        // const shopTab = data

        const data = ShopAll.find((item) => item.id === id && item[tab])  // [tab]json文件中的数组键名
        console.log(data.name, "data")
        const shopTab = [data.name, data[tab]]
        res.send({
            status: "ok",
            data: shopTab
        })
    } else {
        res.send({
            status: "error",
            data: "未知 ID 或 tab"
        })
    }

})



module.exports = router