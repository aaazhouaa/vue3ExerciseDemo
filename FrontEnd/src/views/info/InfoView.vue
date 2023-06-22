<script setup>
import { ref } from "vue"
import { useAuthStore } from "../../stores/counter"
import { toast } from "../../utils/toast"
import Toast from "../../components/Toast.vue"

const store = useAuthStore()
const items = ref(["头像", "用户名", "昵称", "注销"])
</script>

<template>
  <Toast></Toast>
  <div class="info">
    <div class="header item">
      <span>头像</span>
      <img
        :src="store.user.img"
        src="../../../public/imgs/mineheadicon.png"
        alt=""
      />
    </div>
    <div class="item">
      <span>用户名</span>
      <span class="about">{{ store.user.username }}</span>
    </div>
    <div class="item">
      <span>昵称</span>
      <span class="about">{{ store.user.nickname }}</span>
    </div>
    <div class="item">
      <span>注销</span>
      <span @click="toast('别点了,没写这个接口')" class="about"
        >点击注销 ></span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  width: 100%;
  padding-left: 0.1rem;
  box-sizing: border-box;
  background-color: #ffffff;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.14rem;
    color: #333;
    padding: 0.15rem 0.1rem 0.15rem 0;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #f6f6f6;
    .about {
      color: #999;
    }
  }
  .header {
    height: 0.758rem;
    img {
      width: 0.45rem;
      height: 0.45rem;
    }
  }
}
</style>
