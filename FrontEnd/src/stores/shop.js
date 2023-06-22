import { defineStore } from "pinia"


export const useShopStore = defineStore("shop", {
    state: () => ({
        // 购物车中的商品
        cart: {
            // //    第一层 店铺信息
            //  shopId:"1",
            //  "shopName": "良友-浙江中路二店",
            //  
            //     //    第二层 商品信息
            //  productId: {     
            //         count: 1,
            //         discount: "秒杀7.92折限99份",
            //         id: "1",
            //         img: "https://img30.360buyimg.com/n1//s160x160_jfs/t1/108698/25/30338/179541/6405bc6cF950dbf36/b22b38b414da3e32.jpg",
            //         now: "12.5",
            //         pre: "15.8",
            //         residue: "仅剩5件",
            //         sell: "月售0",
            //         title: "藤椒鸡约350g/份（不辣）"
            //     }

        },

    }),
    getters: {},
    actions: {

        //#region
        // // 添加商品入购物车  四个参数: 店铺id 商品id 整个商品信息 添加的数量 ±1
        // changeCartItem(shopId, productId, productInfo, num) {
        //     // cart中的店铺信息 如果 shopId 对应的属性不存在，则创建一个空对象
        //     let shopInfo = this.cart[shopId] || {}

        //     // 店铺中的商品
        //     let product = shopInfo[productId]
        //     // 如果 productId 对应的属性不存在，则把 productInfo 赋值给他
        //     if (!product) {
        //         product = productInfo
        //         product.count = 0
        //     }
        //     // 让相同商品的数量 ±num
        //     product.count = product.count + num
        //     // 商品数量最小是 0
        //     if (product.count < 0) {
        //         product.count = 0

        //         // TODO 清空购物车 console.log(product)
        //         // // product = {}
        //         // delete this.cart[shopId][productId]
        //     } else { // 当前商品数量不为 0
        //         // 购物车总数
        //         this.total += num
        //         if (this.total <= 0) { this.total = 0 }
        //         // 总价
        //         this.price = Number((this.price + (product.now * num)).toFixed(2))
        //     }
        //     // 增加完商品后 把新的商品信息添加回cart中
        //     shopInfo[productId] = product
        //     this.cart[shopId] = shopInfo
        //     console.log(this.price)
        // },
        //#endregion


        changeCartItem(shopId, productId, product, num, shopName) {

            // 对应id的店铺 店铺不存在则为空对象
            let shopInfo = this.cart[shopId] || {}

            // 添加店铺id 店铺名 和 商品列表
            shopInfo.shopId = shopId
            if (shopName) { shopInfo.shopName = shopName }
            shopInfo.product = shopInfo.product || {}

            // 当前店铺购物车内的商品总数
            shopInfo.total = (shopInfo.total || 0) + num
            shopInfo.total = shopInfo.total < 0 ? 0 : shopInfo.total

            // 当前店铺的商品总价
            // shopInfo.price = Number(((shopInfo.price || 0) + product.now * num).toFixed(2))
            shopInfo.price = 0

            // 添加勾选店铺的图标属性
            shopInfo.checked = shopInfo.checked || null


            // 对应id的商品
            let productInfo = shopInfo.product[productId]
            // 商品不存在, 则赋值为传参过来的product
            if (!productInfo) {
                productInfo = product
                // 同时添加一个属性记录当前id商品的数量
                productInfo.count = 0
            }
            // 添加勾选商品图标属性
            productInfo.checked = true

            // 商品的数量 ±num
            productInfo.count += num
            // 商品的数量最小值为 0
            productInfo.count = Math.max(productInfo.count, 0)

            // 把新的商品信息添加回cart中
            shopInfo.product[productId] = productInfo
            this.cart[shopId] = shopInfo

            // 商品数量为0时 删除商品信息
            if (!productInfo.count) {
                delete shopInfo.product[productId]
            }

            // 如果商品列表为空 则清空店铺
            if (Object.keys(shopInfo.product).length === 0) {
                delete this.cart[shopId]
            }
        },

        // 店铺选中的商品的总价
        price(shopId) {
            // 判断是否存在
            if (this.cart[shopId]) {
                // 商铺
                const shop = this.cart[shopId]
                // 总价
                let price = 0

                for (let i in shop.product) {
                    // 商品
                    const product = shop.product[i]
                    if (product.checked) {
                        // 只计算已勾选的商品的价格
                        price = Number((price + product.now * product.count).toFixed(2))
                        // 把价格添加到对应店铺的price属性中
                        shop.price = price
                    }
                }
                return price
            }

        },

        // 清空购物车
        clearCart(shopId) {
            delete this.cart[shopId]
        }

    }, persist: true
})