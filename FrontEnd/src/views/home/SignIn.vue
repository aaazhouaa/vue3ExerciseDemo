<script setup>
import { reactive } from "vue"

const list = reactive([
  { url: "../../../imgs/签到.png" },
  { url: "../../../imgs/领券中心.png" },
  { url: "../../../imgs/免费水果.png" },
  { url: "../../../imgs/领现金.png" },
])
</script>

<template>
  <!-- 签到 -->
  <div class="signIn">
    <div class="signIn__item">
      <img v-for="(item, index) in list" :src="item.url" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 签到
.signIn {
  width: 100%;
  box-sizing: border-box;
  padding-top: 0.02rem;

  &__item {
    overflow: hidden;
    border-radius: 0.1rem;
    margin: 0 0.12rem;
    display: flex;

    img {
      width: 100%;
      height: 10vw;
    }
  }
}
</style>
