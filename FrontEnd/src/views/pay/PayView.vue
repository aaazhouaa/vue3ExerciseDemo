<script setup>
import Header from "./Header.vue"
import ProductList from "./ProductList.vue"
import { useRoute } from "vue-router"
import { computed } from "@vue/reactivity"
import { useShopStore } from "../../stores/shop"
import Confirm from "../../components/Confirm.vue"
import Toast from "../../components/Toast.vue"

const route = useRoute()
const store = useShopStore()

// const price = computed(() => {
//   if (store.cart[route.params.id]?.product) {
//     // 定义商品
//     const product = store.cart[route.params.id].product
//     let price = 0
//     for (let i in product) {
//       if (product[i].checked) {
//         // 判断是否勾选 勾选了才计入总价
//         price = Number((price + product[i].now * product[i].count).toFixed(2))
//       }
//     }
//     return price
//   }
// })
</script>

<template>
  <div class="content">
    <Toast></Toast>
    <Header></Header>
    <ProductList></ProductList>
    <Confirm></Confirm>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-bottom: 1rem;
}
</style>
