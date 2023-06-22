// const express = require("express")
// const app = express()
// const path = require("path")
// const fs = require("fs/promises")
// const jwt = require("jsonwebtoken")

// // 引入数据 (转换为绝对路径)
// let USERS = require(path.resolve(__dirname, "data/user.json"))

// // 引入请求体中间件
// app.use(express.urlencoded())
// // 解析JSON格式请求体的中间件
// app.use(express.json())

// app.use((req, res, next) => {
//     // 设置响应头
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET,POST,PUT,PATH,DELETE,OPTIONS"
//     )
//     res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization")
//     // 放行
//     next()
// })

// // 访问路由前验证是否登录
// app.use((req, res, next) => {
//     try {
//         if (req.path === "/login") {
//             return next()
//         } else {
//             const token = req.get("Authorization")
//             if (!token) {

//                 // token不存在 就重定向到登录路由
//                 res.redirect("/login")

//             } else if (token) {

//                 // 如果token存在 解密token
//                 jwt.verify(token, "jiami", (err, decode) => {

//                     if (err) {

//                         // token无效 就重定向到登录路由
//                         res.redirect("/login")

//                         // 向客户端发送错误信息
//                         res.status(403).send({
//                             status: "error",
//                             message: "token无效"
//                         })
//                     } else {
//                         console.log(decode, "解密的数据")
//                         next()
//                     }
//                 })
//             }
//         }
//     } catch (error) {
//         res.status(500).send({ status: "error", message: "服务器错误" })
//         console.log(error)
//     }

// })


// app.post("/login", (req, res, next) => {
//     // 获取用户名和密码
//     const { account, password } = req.body
//     const user = USERS.find(item => item.account === account && item.password === password)
//     if (user) {
//         // 保质期 一天
//         const token = jwt.sign({ id: user.id, name: user.name, img: user.img }, "jiami000", { expiresIn: "1d" })
//         res.send({
//             status: "ok", data: token
//         })
//     } else {
//         res.send({
//             status: "error", data: "用户名或码错误"
//         })
//     }


// })

const express = require("express")
const app = express()
const path = require("path")
const userLogin = require("./router/login")
const shop = require("./router/shop")
// const shopSideBar = require("./router/(已合并)shop_sideBar")
// const shopAll = require("./router/(已合并)shop_all")
const homeIcons = require("./router/home_icons")


// 引入请求体中间件
// app.use(express.urlencoded())
// 解析JSON格式请求体的中间件
app.use(express.json())

app.use((req, res, next) => {
    // 设置响应头
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATH,DELETE,OPTIONS"
    )
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization")
    // 放行
    next()
})

// 首页分类
app.use(homeIcons)

// 店铺
app.use(shop)

// // 店铺侧边菜单栏
// app.use(shopSideBar)

// // 店铺全部商品
// app.use(shopAll)


// 使用login路由
app.use(userLogin)


app.listen(3000, () => {
    console.log("服务器启动成功")
})