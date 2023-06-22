<script setup>
import { ref } from "vue"
import Header from "./Header.vue"
import Menu from "./Menu.vue"
import Home from "./Home.vue"
import Toast from "../../components/Toast.vue"
import All from "./All.vue"
import Cart from "./Cart.vue"

const List = ref([{ text: "首页" }, { text: "全部商品" }, { text: "省运费" }])
// 接收子元素选择的元素 根据元素进行页面组件的显隐
const selected = ref(0)
// 接收子组件传递过来的数据
function select(index) {
  selected.value = index
}
</script>

<template>
  <div class="wrapper">
    <Header></Header>
    <Toast></Toast>
    <Menu :List="List" @select="select"></Menu>
    <Home v-if="selected === 0"></Home>
    <All v-if="selected === 1"></All>
  </div>
  <Cart></Cart>
</template>

<style lang="scss" scoped>
.wrapper {
  // 防止底栏遮挡
  margin-bottom: 0.6rem;
  background-color: #f8f8f8;
}
</style>
