import axios from "axios"

// 创建一个实例
// const instance = axios.create({
//     baseURL: "https://www.fastmock.site/mock/dd81fd528aab99900c5218c03e2bea5e/jd",
// })

// // axios 封装
// export function post(url, data) {
//     // return返回数据 用async/await方法时记得最后return数据
//     return new Promise((resolve, reject) => {
//         // 调用axios.post方法
//         // 第一个参数是地址，第二个参数是 数据 第三个是配置对象
//         axios.post(url, data, {
//             baseURL: "https://www.fastmock.site/mock/dd81fd528aab99900c5218c03e2bea5e/jd",
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(res => resolve(res.data))
//             .catch(err => reject(err))
//     })

// }

//  // 没使用实例
// export async function get(url) {
//     try {
//         const data = await axios.get(url, {
//             baseURL: "https://www.fastmock.site/mock/dd81fd528aab99900c5218c03e2bea5e/jd"
//         })

//         // 返回数据
//         return data.data

//     } catch (error) {
//         console.log("商品类型,请求错误", error)
//     }

// }
const instance = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "http://43.142.140.165:3000",

    // headers: {
    //     authorization: `Bearer ${token}`,
    // }
})

export async function get(url, params = {}) {
    try {
        // 将params作为查询字符串参数添加到 url中
        const data = await instance.get(url, { params })
        // 返回数据
        return data.data

    } catch (error) {
        console.log(error)
        throw (error)
    }
}




// post 请求
export async function post(url, data = {}) {
    try {
        const Data = await instance.post(url, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        // 记得返回数据
        return Data.data
    } catch (error) {
        console.log(error)
        throw (error)
    }

}
