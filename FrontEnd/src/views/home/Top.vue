<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
const props = defineProps(["item"])
const items = props.item
</script>

<template>
  <!-- 顶栏 -->
  <div :style="{ backgroundColor: items.nav }" class="top">
    <div :style="{ color: items.fontColor }" class="top__position">
      <i class="top__position__icon1 iconfont">&#xe600;</i>
      <span class="top__position__text">暂时显示静态文字</span>
      <i class="top__position__icon2 iconfont">&#xe601;</i>
    </div>
    <div
      @click="router.push('/search')"
      :style="{ backgroundColor: items.search }"
      class="top__search"
    >
      <i class="top__search__icon iconfont">&#xe632;</i>
      <div class="top__search__desc">搜索附近的商家、商品</div>
    </div>
    <div class="top__reduce">
      <img src="../../../public/imgs/满减.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";

// 顶栏
.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 0.44rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;

  // 位置
  &__position {
    color: #ffffff;
    display: flex;
    width: 36%;

    &__icon1 {
      font-size: 0.2rem;
      margin: 0 0.08rem 0 0.12rem;
    }

    &__icon2 {
      display: flex;
      align-items: center;
      margin-right: 0.03rem;
    }

    &__text {
      font-size: 0.16rem;
      font-weight: bold;
      @include ellipse;
    }
  }

  &__search {
    width: 47%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 0.16rem;
    background-color: #ffffff;
    border-radius: 0.64rem;
    color: gray;

    &__desc {
      position: relative;
      font-size: 0.14rem;
      @include ellipse;
      margin: 0.06rem 0;
    }
  }

  &__reduce {
    margin: 0 0.08rem;
    img {
      width: 0.32rem;
      height: 0.32rem;
    }
  }
}
</style>
