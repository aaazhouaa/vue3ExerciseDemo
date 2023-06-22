<script setup>
import { confirmData } from "../utils/confirm"
</script>

<template>
  <Teleport to="body">
    <div v-if="confirmData.show" class="background"></div>
    <Transition name="prompt">
      <div v-if="confirmData.show" class="prompt">
        <div class="texts">
          <div class="title">{{ confirmData.title }}</div>
          <div v-if="confirmData.tips" class="tips">{{ confirmData.tips }}</div>
        </div>
        <div class="btns">
          <div @click="confirmData.show = false" class="cancel">取消</div>
          <div class="fenge"></div>
          <div @click="confirmData.handleClickSure()" class="sure">
            {{ confirmData.sureText }}
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.prompt-enter-active {
  animation: prompt-in 0.5s;
}

@keyframes prompt-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  background-color: rgb(0, 0, 0, 0.8);
}
.prompt {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translate(-50%, -50%);
  z-index: 9;
  color: #333;
  text-align: center;
  width: 2.7rem;
  min-height: 1.46rem;
  font-size: 0.18rem;
  background-color: #fff;
  border-radius: 0.12rem;
  background-image: green;

  // 文本内容
  .texts {
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: center;
    .title {
      font-weight: bold;
      padding: 0.2rem 0 0.1rem;
    }
    .tips {
      font-size: 0.14rem;
      padding: 0 0.2rem 0.2rem;
    }
  }

  // 按钮
  .btns {
    display: flex;
    height: 0.52rem;
    justify-content: space-evenly;
    align-items: center;
    border-top: 0.01rem solid #f3f3f3;
    .cancel {
      flex: auto;
      color: #999;
    }
    .fenge {
      width: 0.01rem;
      height: 0.52rem;
      border-right: 0.01rem solid #f3f3f3;
    }

    .sure {
      flex: auto;
      color: #47b34f;
      font-weight: bold;
    }
  }
}
</style>
