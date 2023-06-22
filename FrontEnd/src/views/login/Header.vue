<script setup>
import { useRouter } from "vue-router"

// 取消登录,返回
const router = useRouter()
const back = () => {
  router.back(1)
}
</script>

<template>
  <div class="header">
    <span @click="back" class="icon"></span>
    <span class="text">京东登录注册</span>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 0.44rem;
  text-align: center;
  line-height: 0.44rem;

  .icon {
    position: absolute;
    top: 0.1rem;
    display: block;
    // top: 10px;
    width: 0.24rem;
    height: 0.24rem;
    background-image: url("../../../imgs/login/左箭头.png");
    background-size: 100% auto;
  }

  .text {
    font-size: 0.17rem;
  }
}
</style>
