const express = require("express")
const router = express()
const path = require("path")
const fs = require("fs/promises")
const jwt = require("jsonwebtoken")

// 引入数据 (转换为绝对路径)
let USERS = require(path.resolve(__dirname, "../data/user.json"))

// // 引入请求体中间件
// router.use(express.urlencoded())
// // 解析JSON格式请求体的中间件
// router.use(express.json())

// router.use((req, res, next) => {
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

// 访问路由前验证是否登录
router.use((req, res, next) => {
    try {
        if (req.path === "/login") {
            return next()
        } else {
            const token = req.get("Authorization")
            if (!token) {
                // token不存在 就重定向到登录路由
                res.redirect("/login")

            } else if (token) {

                // 如果token存在 解密token
                jwt.verify(token, "jiami", (err, decode) => {

                    if (err) {

                        // token无效 就重定向到登录路由
                        res.redirect("/login")

                        // 向客户端发送错误信息
                        res.status(403).send({
                            status: "error",
                            message: "token无效"
                        })
                    } else {
                        console.log(decode, "解密的数据")
                        next()
                    }
                })
            }
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "服务器错误" })
        console.log(error)
    }

})


router.post("/login", (req, res, next) => {
    // 获取用户名和密码
    const { account, password } = req.body
    const user = USERS.find(item => item.account === account && item.password === password)
    if (user) {
        // 保质期 一天
        const token = jwt.sign({ id: user.id, nickname: user.nickname, username: user.username, img: user.img }, "jiami000", { expiresIn: "1d" })
        res.send({
            status: "ok", data: token
        })
    } else {
        res.send({
            status: "error", data: "用户名或码错误"
        })
    }


})

module.exports = router