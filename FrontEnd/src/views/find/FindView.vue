<script setup>
import { ref, reactive } from "vue"
import Panel from "./Panel.vue"
import { useAuthStore } from "../../stores/counter"

const store = useAuthStore()

const current = ref(0)

// 未登录
const itemList = reactive([
  {
    icon: "../../../imgs/panel图片.png",
    title: "暂未登录",
    text: "快去登录，迫不及待与你相见啦~",
    desc: "立即登录",
    to: "/login",
  },
])

// 已登录
const itemList1 = reactive([
  {
    icon: "../../../imgs/isLogin/find/img.png",
    title: "暂无关注商家",
    text: "关注附近商家，第一时间获取优惠信息",
    // desc: "立即登录",
    // to: "/login"
  },
])
</script>

<template>
  <div class="top">
    <div
      class="top__item"
      @click="current = 0"
      :class="{ active: current === 0 }"
    >
      关注
    </div>
    <div
      class="top__item"
      @click="current = 1"
      :class="{ active: current === 1 }"
    >
      食谱
    </div>
    <div
      class="top__item"
      @click="current = 2"
      :class="{ active: current === 2 }"
    >
      种草社
    </div>
  </div>
  <div class="placeholder"></div>
  <!-- 引入的模块控制显隐 -->
  <!-- 未登录 -->
  <Panel v-if="!store.isAuthenticate" :item="itemList"></Panel>
  <!-- 已登录 -->
  <Panel v-if="store.isAuthenticate" :item="itemList1"></Panel>
</template>

<style lang="scss" scoped>
.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;

  &__item {
    height: 100%;
    font-size: 0.16rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.15rem 0.13rem;
  }

  .active {
    color: #47b34f;
  }

  .active::after {
    position: absolute;
    content: "";
    width: 0.2rem;
    height: 0.03rem;
    border-radius: 0.05rem;
    background-color: #47b34f;
    bottom: 0.07rem;
  }
}

.placeholder {
  height: 0.5rem;
}
</style>
