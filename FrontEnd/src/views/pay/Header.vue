<script setup>
import { useRouter } from "vue-router"
import { useAuthStore } from "../../stores/counter"
import ChangeAddress from "./ChangeAddress.vue"
import { ref } from "vue"
import { computed } from "@vue/reactivity"

const store = useAuthStore()
const router = useRouter()

// const [address, doorNumber, owner, phoneNumber] = store.getAddress // 位置 + 门牌号 + 收件人 + 手机号码
const address = computed(() => store.getAddress[0])
const doorNumber = computed(() => store.getAddress[1])
const owner = computed(() => store.getAddress[2])
// 加密后的手机号
const phoneNumber = computed(() =>
  store.getAddress[3].replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
)

// 控制地址管理组件的显隐
const display = ref(false)
</script>

<template>
  <ChangeAddress :display="display" @hidden="display = false"></ChangeAddress>
  <div class="header">
    <div class="background"></div>
    <div class="message">
      <div
        v-if="!address"
        @click="router.push('/createAddress')"
        class="address"
      >
        <div class="new-address">新建收货地址</div>
        <div class="icon iconfont">&#xe630;</div>
      </div>

      <div v-if="address && doorNumber" @click="display = true" class="address">
        <div class="new-address">{{ address }}{{ doorNumber }}</div>
        <div class="icon iconfont">&#xe630;</div>
      </div>
      <div v-if="owner && phoneNumber" class="info">
        <span style="padding-right: 0.15rem">{{ owner }}</span>
        <span>{{ phoneNumber }}</span>
      </div>
      <div class="time">
        <div class="text">送达时间</div>
        <div class="get-time">立即送达 20:17-21:17</div>
        <div class="icon iconfont">&#xe630;</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  .background {
    width: 100%;
    min-height: 0.96rem;
    background-color: #3fd24e;
  }

  .message {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // gap: 0.3rem;
    padding: 0.15rem;
    margin: -0.86rem 0.1rem 0.1rem;
    border-radius: 0.12rem;
    background-color: #fff;
    .icon {
      color: #c9c9c9;
    }
    // 新建收货地址
    .address {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .new-address {
        font-size: 0.2rem;
        font-weight: bold;
        color: #333;
      }
    }
    // 发送 手机号
    .info {
      font-size: 0.14rem;
      color: #7c7c7c;
      padding-top: 0.02rem;
      padding-bottom: 0.15rem;
    }
    // 送达时间
    .time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.15rem;
      font-size: 0.16rem;

      .text {
        flex: auto;
        font-weight: bold;
        color: #333;
      }
      // 送达时间
      .get-time {
        margin-right: 0.05rem;
        color: #3b8fee;
      }
    }
  }
}
</style>
