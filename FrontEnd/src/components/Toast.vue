<script setup>
import { data } from "../utils/toast"
</script>

<template>
  <Teleport to="body">
    <div v-if="data.showToast" class="toast">
      <div class="text">{{ data.toastText }}</div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  z-index: 9;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.05rem;
  background-color: rgb(0, 0, 0, 0.5);

  .text {
    padding: 0.15rem 0.2rem;
    text-align: center;
    font-size: 0.16rem;
    color: #ffffff;
  }
}
</style>
