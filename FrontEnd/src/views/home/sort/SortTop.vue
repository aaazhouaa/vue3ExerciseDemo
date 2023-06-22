<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<template>
  <div class="top">
    <img class="bg" src="" alt="" />
    <div @click="router.back(1)" class="back">
      <span class="icon iconfont">&#xe62f;</span>
    </div>
    <div class="title">生鲜菜场</div>
    <div class="search">
      <div class="search__icon iconfont">&#xe632; 柚子</div>

      <div class="input"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../style/mixins.scss";
.top {
  display: flex;
  align-items: center;
  height: 0.44rem;
  background-position: top;
  background-repeat: no-repeat;
  // 返回
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.42rem;
    height: 0.24rem;
    margin-right: 0.08rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: rgb(255, 255, 255, 0.2);
    .icon {
      padding-right: 0.08rem;
      color: #fff;
    }
  }

  // 分类大标题
  .title {
    font-size: 0.22rem;
    font-weight: bold;
    color: #fff;
    margin-right: 0.12rem;
    @include ellipse;
  }
  // 搜索框
  .search {
    position: relative;
    flex: 1;
    margin-right: 0.12rem;
    overflow: hidden;
    &__icon {
      position: absolute;
      top: 0.06rem;
      left: 0.1rem;
      font-size: 0.14rem;
      color: #999999;
    }
    .input {
      width: 100%;
      height: 0.3rem;
      border-radius: 0.15rem;
      background-color: #fff;
    }
  }
}
</style>
