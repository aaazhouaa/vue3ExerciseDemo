<script setup>
import Panel from "../find/Panel.vue"
import { reactive } from "vue"
import { useAuthStore } from "../../stores/counter"
import Confirm from "../../components/Confirm.vue"
import { confirmData, confirmFn } from "../../utils/confirm"

const store = useAuthStore()
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
    title: "暂无订单",
    text: "嗯哼，每天下一单，生活更简单呦~",
    desc: "立即去下单",
    to: "/",
    outerHeight: "2.4rem",
    top: "0",
    height: ".8rem",
    width: ".8rem",
  },
])
</script>

<template>
  <Confirm></Confirm>
  <!-- 未登录 -->
  <Panel v-if="!store.isAuthenticate" :item="itemList"></Panel>
  <div v-if="store.isAuthenticate" class="order">
    <div class="search">
      <div class="search__box">
        <div class="icon iconfont">&#xe632;</div>
        <div
          @click="
            confirmFn(
              [
                '数据库没写',
                '点击这个搜索框只要把下面的区域删掉就ok了,然后向后端发送携带搜索信息的请求',
              ],
              () => (confirmData.show = false)
            )
          "
          class="input"
        >
          搜索历史订单
        </div>
      </div>
    </div>

    <!-- 已登陆 -->
    <Panel v-if="store.isAuthenticate" :item="itemList1" class="item"></Panel>
  </div>
</template>

<style lang="scss" scoped>
.order {
  height: 100vh;
  background-color: #fff;
  .item {
    margin: 0;
    padding-top: 0.18rem;
    background-color: #fff;
  }
  .search {
    padding: 0.07rem 0.1rem;
    box-sizing: border-box;
    &__box {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0.3rem;
      background-color: #f8f8f8;
      border-radius: 0.3rem;
      .icon {
        margin-right: 0.1rem;
        font-size: 0.14rem;
        color: #a2a2a2;
        background-color: #f8f8f8;
      }
      .input {
        color: #666666;
        font-size: 0.14rem;
      }
    }
  }
}
.panel {
  margin-top: 0.44rem;
  height: 6rem;
  background-color: #f8f8f8;
}
</style>
