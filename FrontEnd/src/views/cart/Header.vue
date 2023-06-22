<script setup>
import { useShopStore } from "../../stores/shop"
import CartList from "../shop/CartList.vue"
import { computed, watch, watchEffect } from "vue"
import { useAuthStore } from "../../stores/counter"
import { confirmFn } from "../../utils/confirm"
import { useRouter } from "vue-router"

const AuthStore = useAuthStore()
const store = useShopStore()
const router = useRouter()
const props = defineProps(["price"])

// 去结算
function toPay(shopId) {
  AuthStore.isAuthenticate
    ? router.push(`/pay/${shopId}`)
    : confirmFn(
        ["温馨提示", "您还没有登录"],
        () => router.push("/login"),
        "去登录"
      )
}

// 已勾选的商品的总价
const price = computed(
  () =>
    function fn(shopId) {
      // 定义商品
      const product = store.cart[shopId].product
      let price = 0
      for (let i in product) {
        if (product[i].checked) {
          // 判断是否勾选 勾选了才计入总价
          price = Number((price + product[i].now * product[i].count).toFixed(2))
        }
      }
      return price
    }
)

// 调用这个方法 就 勾选 所有这个店铺购物车中的商品
function changeChecked(shopId) {
  const shop = store.cart[shopId] // 店铺
  // 购物车中的商品
  const product = store.cart[shopId]?.product
  for (let key in product) {
    // 通过店铺 checked来决定是 勾选 还是 取消勾选
    product[key].checked = shop.checked
  }
}

// 监听勾选状态
watchEffect(() => {
  for (let key in store.cart) {
    const shop = store.cart[key] // 每个店铺
    const product = shop?.product // 对应各个店铺购物车中的商品

    // 检查每项的checked值 如果都为 true则返回true 反之返回false
    // object.values() 转换成数组 并返回属性值(value) arr.every() 检测所有元素是否都满足条件, 是 返回 true, 反之 false
    const result = Object.values(product).every(
      (product) => product.checked === true
    )
    result ? (shop.checked = true) : (shop.checked = false)
  }
})
</script>

<template>
  <div v-for="(item, index) in store.cart" class="items">
    <div class="header">
      <!-- 勾选状态 -->
      <div class="checked">
        <!-- 默认是勾选状态 所以点击变为未勾选状态 应该减少价格 -->
        <img
          v-if="item.checked"
          @click=";(item.checked = !item.checked), changeChecked(item.shopId)"
          src="../../../public/imgs/shop/勾选.png"
          alt=""
        />
        <img
          v-if="!item.checked"
          @click=";(item.checked = !item.checked), changeChecked(item.shopId)"
          src="../../../public/imgs/shop/未勾选.png"
          alt=""
        />
      </div>
      <!-- 店铺信息 -->
      <div class="header-items">
        <div class="first">
          <div class="title-items">
            <div @click="router.push(`/shop/${item.shopId}`)" class="shop-name">
              {{ item.shopName }}
            </div>
            <div class="right-icon iconfont">&#xe630;</div>
          </div>
          <div
            @click="
              confirmFn(['清空购物车中所有商品?'], () =>
                store.clearCart(item.shopId)
              )
            "
            class="clear iconfont"
          >
            &#xe60d; 清空购物车
          </div>
        </div>
        <div class="second">
          <div class="time">明日09:00开始配送</div>
          <div class="distance">1km</div>
          <div class="free">运费</div>
          <div class="price">¥5</div>
        </div>
      </div>
    </div>
    <div class="cart-item">
      <!-- 对应店铺中 购物车中的商品 -->
      <CartList :cart="store.cart[item.shopId]"></CartList>
    </div>
    <!-- 总价 去结算 -->
    <div class="total">
      <div class="price-item">
        <div class="text">总价</div>
        <!-- 商品总价 -->
        <div class="total-price">¥{{ price(item.shopId) }}</div>
      </div>
      <div class="pay">
        <!-- 跳转到对应的商铺 -->
        <div @click="router.push(`/shop/${item.shopId}`)" class="to-shop">
          进店选购
        </div>
        <!-- 勾选了商品时 -->
        <div
          v-if="price(item.shopId)"
          @click="toPay(item.shopId)"
          class="to-pay"
        >
          去结算
        </div>
        <!-- 没有勾选任何商品时 -->
        <div v-if="!price(item.shopId)" class="to-pay to-pay-none">去结算</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.items {
  display: flex;
  flex-direction: column;
  border-radius: 0.12rem;
  overflow: hidden;
  background-color: #fff;
  margin: 0.1rem 0.12rem 0 0.12rem;

  // 店铺信息
  .header {
    display: flex;
    width: 100%;
    padding: 0.1rem;
    height: 0.68rem;
    margin-bottom: 0.12rem;
    background-color: #fcfcfc;

    // 勾选商品
    .checked {
      margin-top: 0.25rem;
      margin-right: 0.08rem;
      padding-left: 0.05rem;
      img {
        width: 0.22rem;
        height: 0.22rem;
      }
      .icon {
        background-image: url("../../../imgs/shop/勾选.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
      .uncheck {
        background-image: url("../../../imgs/shop/未勾选.png");
      }
    }
    .header-items {
      display: flex;
      flex: auto;
      flex-direction: column;
      justify-content: center;

      // 店铺名
      .first {
        display: flex;
        justify-content: space-between;
        padding-right: 0.25rem;
        .title-items {
          display: flex;
          align-items: center;
          .shop-name {
            font-size: 0.16rem;
            font-weight: bold;
            @include ellipse;
          }
        }
        .right-icon {
          margin-left: 0.05rem;
        }
        // 清空购物车
        .clear {
          font-size: 0.12rem;
          color: #999;
          @include ellipse;
        }
      }
      .second {
        display: flex;
        gap: 0.05rem;
        margin-top: 0.05rem;
        color: #747474;
        // 配送时间
        .time {
          color: #348bed;
          @include ellipse;
        }
        .distance::after {
          content: "|";
          display: inline-block;
          height: 0.14rem;
          margin-left: 0.05rem;
          vertical-align: top;
          color: #dedede;
          overflow: hidden;
        }
        // 配送费
        .price {
          margin-left: -0.05rem;
        }
      }
    }
  }

  // 购物车列表
  .cart-item {
    padding: 0.1rem;
    box-sizing: border-box;
  }

  // 去结算
  .total {
    display: flex;
    padding: 0.1rem;
    flex-direction: column;
    font-size: 0.14rem;

    // 价格
    .price-item {
      display: flex;
      justify-content: space-between;
      height: 0.36rem;
      color: #333;
      border-bottom: 0.01rem solid #f6f6f6;

      .total-price {
        font-size: 0.16rem;
        font-weight: bold;
      }
    }

    // 进店选购 去结算
    .pay {
      display: flex;
      justify-content: end;
      padding-top: 0.12rem;
      height: 0.5rem;
      font-weight: bold;
      .to-shop,
      .to-pay {
        width: 0.88rem;
        height: 0.38rem;
        text-align: center;
        line-height: 0.38rem;
        border-radius: 0.2rem;
        margin-left: 0.08rem;
      }

      .to-shop {
        color: #00cf37;
        background-color: #e5faeb;
      }
      .to-pay {
        color: #fff;
        background-color: #1ad44b;
      }
      .to-pay-none {
        background-color: #909090;
      }
    }
  }
}
</style>
