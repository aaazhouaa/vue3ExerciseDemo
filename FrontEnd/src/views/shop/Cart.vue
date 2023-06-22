<script setup>
import { computed, ref, watchEffect } from "vue"
import { useShopStore } from "../../stores/shop"
import CartList from "./CartList.vue"
import { useAuthStore } from "../../stores/counter"
import { useRoute, useRouter } from "vue-router"
import Confirm from "../../components/Confirm.vue"
import { confirmFn } from "../../utils/confirm"
import MyTransition from "../../components/MyTransition.vue"

const AuthStore = useAuthStore()
const store = useShopStore()
const router = useRouter()
const route = useRoute()

const cart = computed(() => store.cart?.[route.params.id] || {})
// 当前商品的总价
const price = computed(() => store.price(cart.value.shopId))

// 当前商品的总数
const total = computed(() => store.cart[route.params.id]?.total)
// // 显隐购物车内的商品列表
const show = ref(false)

watchEffect(() => {
  // 当商品列表为空 点击购物车就会出现这个情况
  if (!total.value && show.value) {
    show.value = false
  }
})

// 跳转到购物车页面
function toCartView() {
  if (AuthStore.isAuthenticate) {
    router.push("/cart")
  } else {
    confirmFn(["温馨提示", "您还没有登录"], () => router.push("/login"))
  }
}
</script>

<template>
  <Confirm></Confirm>

  <MyTransition #front>
    <div v-if="show" class="cartList">
      <CartList :cart="cart"></CartList>
    </div>
  </MyTransition>

  <MyTransition #back>
    <div @click="show = false" v-if="show" class="back"></div>
  </MyTransition>
  <div class="docker">
    <div class="docker__car">
      <div
        @click="show = !show"
        class="docker__car__icon"
        :class="{ active: total }"
      >
        <div v-if="total" class="count">
          {{ total }}
        </div>
      </div>
      <div v-if="!total" class="text">购物车是空的</div>
      <div v-if="total" class="money">¥{{ price }}</div>
    </div>
    <div v-if="!price" class="docker__btn">20元起送</div>
    <div v-if="20 - price > 0 && price" class="docker__btn">
      差{{ (20 - price).toFixed(2) }}元起送
    </div>
    <div
      @click="toCartView"
      v-if="20 - price <= 0"
      class="docker__btn active__btn"
    >
      去结算
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 购物车列表
.cartList {
  position: fixed;
  bottom: 0.55rem;
  width: 100%;
  min-height: 25%;
  max-height: 70%;
  border-top-left-radius: 0.1rem;
  border-top-right-radius: 0.1rem;
  padding: 0.3rem 0.08rem 0.1rem 0.08rem;
  box-sizing: border-box;
  background-color: #fff;
  overflow: scroll;
  z-index: 2;
}
.back {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  opacity: 0.5;
  z-index: 1;
}
// // 购物车列表进出场动画
// .cart-enter-active,
// .cart-leave-active,
// // 半透明图层
// .back-enter-active,
// .back-leave-active {
//   transition: all 0.5s ease-in-out;
// }

// .cart-enter-from,
// .cart-leave-to {
//   transform: translateY(100%);
// }

// .back-enter-from,
// .back-leave-to {
//   opacity: 0;
// }

// 底栏购物车
.docker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.6rem;
  font-size: 0.14rem;
  padding: 0 0.12rem;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 2;

  &__car {
    display: flex;

    &__icon {
      position: relative;
      width: 0.44rem;
      height: 0.44rem;
      background-image: url("../../../imgs/shop/购物车.png");
      background-position: bottom;
      background-size: cover;
      .count {
        position: absolute;
        top: -0.04rem;
        right: 0;
        width: 0.18rem;
        height: 0.18rem;
        text-align: center;
        font-size: 0.12rem;
        border-radius: 50%;
        background-color: #ff5757;
        color: #fff;
      }
    }
    // 购物车有商品时
    .active {
      background-position: top;
    }
    .text {
      color: #999999;
      line-height: 0.44rem;
      margin-left: 0.08rem;
    }
    .money {
      font-size: 0.18rem;
      font-weight: bold;
      margin-left: 0.08rem;
    }
  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.88rem;
    height: 0.4rem;
    text-align: center;
    font-weight: bold;
    color: #fff;
    background-color: #b7b7b7;
    box-sizing: border-box;
    border-radius: 0.2rem;
    padding: 0 0.02rem;
  }
  .active__btn {
    background-color: #0fd243;
  }
}
</style>
