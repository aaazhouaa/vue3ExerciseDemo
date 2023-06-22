<script setup>
import { toast } from "../../utils/toast"
</script>

<template>
  <!-- 其他登录方式 -->
  <div class="other">
    <h4>其他登录方式</h4>
    <p class="choose">
      <a @click="toast('没写')" class="icon-qq"></a>
      <a @click="toast('没写')" class="icon-wechat"></a>
      <a @click="toast('没写')" class="icon-apple"></a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.other {
  height: 0.87rem;
  margin-top: 0.88rem;
  border-top: 0.01rem solid rgba(0, 0, 0, 0.1);

  h4 {
    margin: -0.11rem auto 0;
    width: 1.4rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }

  .choose {
    height: 0.562rem;
    // width: 33%;
    margin: 0.25rem 0 0.12rem;
    text-align: center;

    a {
      display: inline-block;
      width: 0.48rem;
      margin: 0 0.165rem;
      background-size: 100% auto;
      background-repeat: no-repeat;
      padding-top: 0.53rem;
      box-sizing: border-box;
    }

    .icon-qq {
      background-image: url("../../../imgs/login/qq.png");
    }

    .icon-wechat {
      background-image: url("../../../imgs/login/WeChat.png");
    }

    .icon-apple {
      background-image: url("../../../imgs/login/apple.png");
    }
  }
}
</style>
