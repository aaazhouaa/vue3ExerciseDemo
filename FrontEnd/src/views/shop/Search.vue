<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
// 组件需要接受一个 text 值
const props = defineProps(["item"])
</script>

<template>
  <!-- 搜索框 -->
  <div id="wrapper">
    <div @click="router.push('/search')" class="search">
      <div class="search__icon"></div>
      <div class="search__text">{{ props.item }}</div>
    </div>
    <div class="icon"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
#wrapper {
  width: 100%;
  height: 0.4rem;
  padding: 0.05rem 0.1rem;
  box-sizing: border-box;
  display: flex;
  background-color: #fff;

  .search {
    display: flex;
    width: 100%;
    height: 0.3rem;
    color: #999;
    background-color: #f4f4f4;
    border-radius: 0.3rem;
    line-height: 0.3rem;
    text-align: left;

    &__icon {
      width: 0.27rem;
      height: 0.27rem;
      overflow: hidden;
      background-image: url("../../../imgs/search.png");
      background-size: 0.44rem auto;
      background-position: -0.05rem -0.07rem;
      background-repeat: no-repeat;
      overflow: hidden;
    }

    &__text {
      font-size: 0.14rem;
      @include ellipse;
    }
  }

  .icon {
    width: 0.46rem;
    height: 0.3rem;
    margin: 0 0.07rem;
    background-image: url("../../../imgs/shop/领券.png");
    background-size: 0.44rem auto;
    background-repeat: no-repeat;
  }
}
</style>
