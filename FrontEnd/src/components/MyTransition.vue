<script setup></script>

<template>
  <Transition name="front">
    <slot name="front"></slot>
  </Transition>
  <Transition name="back">
    <slot name="back"></slot>
  </Transition>
</template>

<style lang="scss" scoped>
// 购物车列表进出场动画
.front-enter-active,
.front-leave-active,
// 半透明图层
.back-enter-active,
.back-leave-active {
  transition: all 0.5s ease-in-out;
}

.front-enter-from,
.front-leave-to {
  transform: translateY(100%);
}

.back-enter-from,
.back-leave-to {
  opacity: 0;
}
</style>
