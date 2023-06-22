<script setup>
import { reactive } from "vue"

const list = reactive([
  { text: "星巴克开业季" },
  { text: "空调" },
  { text: "苹果" },
  { text: "香蕉" },
  { text: "牛奶" },
  { text: "草莓" },
  { text: "" },
])
</script>

<template>
  <!-- 顶栏的小list -->
  <div class="list">
    <div class="list__background">
      <div class="none"></div>
      <div class="list__item">
        <div v-for="(item, index) in list" class="list__item__desc">
          <span>{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
// 顶栏下边的list
.list {
  &__background {
    z-index: -1;
    width: 100%;
    height: 0.7rem;
    background-image: url("../../../imgs/顶栏背景.png");

    .none {
      width: 100%;
      height: 0.46rem;
    }
  }

  &__item {
    display: flex;
    color: #ffffff;
    justify-content: space-around;
    margin: 0 0.1rem;

    &__desc {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 0.02rem 0.08rem;
      border-radius: 0.1rem;
      @include ellipse;
    }
  }

  &__item :nth-last-child(1) {
    background-color: transparent;
  }
}
</style>
