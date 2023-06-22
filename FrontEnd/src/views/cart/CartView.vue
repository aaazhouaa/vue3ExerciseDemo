<script setup>
import { reactive } from "vue"
import { useShopStore } from "../../stores/shop"
import Header from "./Header.vue"
import IconItem from "../../components/IconItem.vue"
import Confirm from "../../components/Confirm.vue"
import Toast from "../../components/Toast.vue"

const store = useShopStore()

// 未登录时显示的内容
const IconList = reactive([
  {
    icon: "../../../imgs/noCart.png",
    title: "购物车空空如也",
    text: "哦莫,那么多好物都没有你想要的吗?",
    desc: "去逛逛",
    to: "/",
  },
])
</script>

<template>
  <Toast></Toast>
  <Confirm></Confirm>
  <div v-if="Object.keys(store.cart).length <= 0" class="content">
    <IconItem :items="IconList"></IconItem>
  </div>
  <div v-if="Object.keys(store.cart).length > 0" class="cart">
    <Header></Header>
  </div>
</template>

<style lang="scss" scoped>
// 修改子组件的图片大小
.content:deep(.item) {
  margin: 0;
  height: 1.93rem;
  border-bottom-left-radius: 0.12rem;
  border-bottom-right-radius: 0.12rem;
  background-color: #fff;
}

.content :deep(.item__img) {
  width: 0.68rem;
  height: 0.68rem;
  margin-top: 0.12rem;
}
.cart {
  margin-bottom: 0.6rem;
}
</style>
