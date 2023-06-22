<script setup>
import { ref, onMounted, reactive, onUnmounted } from "vue"
import Top from "./Top.vue"
import TopList from "./TopList.vue"
import Banner from "./Banner.vue"
import Icons from "./Icons.vue"
import SignIn from "./SignIn.vue"
import AD from "./AD.vue"
import Commodity from "./Commodity.vue"

const topNav = reactive({
  nav: "",
  fontColor: "",
  search: "",
})

// 执行方法
onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})
// 离开时销毁监听事件
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

// 导航栏变色
function handleScroll() {
  let scrollTop = window.scrollY

  // 设置背景颜色的透明度
  if (scrollTop) {
    topNav.nav = `rgba(255, 255, 255,${scrollTop / 44})`
    topNav.fontColor = "black"
    topNav.search = "#f6f6f6"
  } else {
    // 设置回到顶部时，背景颜色为透明
    topNav.nav = "transparent"
    topNav.fontColor = "white"
    topNav.search = "#fff"
  }
}
</script>

<template>
  <!-- 把样式传过去 -->
  <Top :item="topNav"></Top>
  <TopList></TopList>
  <Banner></Banner>
  <Icons></Icons>
  <SignIn></SignIn>
  <AD></AD>
  <div class="wrapper">
    <Commodity></Commodity>
  </div>
</template>

<style lang="scss" scoped>
// .head:deep(.top) {
//   v-band:background-color: {
//       {
//       scrollPosition>44?"white": none
//     }
//   }
// }
.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0 0.12rem 0.6rem;
  box-sizing: border-box;
}
</style>
