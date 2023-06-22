<script setup></script>

<template>
  <!-- banner -->
  <div class="banner">
    <img class="banner__img" src="../../../public/imgs/banner.gif" alt="" />
  </div>
</template>

<style lang="scss" scoped>
// banner
// 防止在网络不佳的情况下加载图片时, 没加载出来, 导致下面内容的抖动
// 图片提前占位置
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 37.3%;

  &__img {
    width: 100%;
  }
}
</style>
