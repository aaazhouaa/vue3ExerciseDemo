<script setup>
import { ref } from "vue"

const select = ref(0)

// 传一个含有 text属性的 数组
const props = defineProps(["List"])
const List = props.List

// 向父元素传递当前所选项
const emit = defineEmits(["select"])
function handleClick() {
  emit("select", select.value)
}
</script>

<template>
  <div class="menu">
    <div
      v-for="(item, index) in List"
      :class="['text', { active: index === select }]"
      @click="
        () => {
          select = index
          handleClick()
        }
      "
    >
      {{ item.text }}
      <div v-if="select === index" class="line"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";

.menu {
  height: 0.4rem;
  font-size: 0.16rem;
  line-height: 0.2rem;
  background-color: #fff;
  display: flex;

  .text {
    position: relative;
    z-index: 0;
    height: 0.4rem;
    margin: 0 0.12rem;
    padding: 0.1rem 0;
    box-sizing: border-box;
    color: #747474;
    @include ellipse;

    .line {
      position: absolute;
      z-index: -1;
      bottom: 0.11rem;
      width: 100%;
      height: 0.04rem;
      background-image: linear-gradient(
        135deg,
        rgb(75, 214, 98) 0%,
        rgb(75, 214, 98) 100%
      );
    }
  }

  .active {
    font-size: 0.2rem;
    color: #333333;
    font-weight: bold;
    margin: 0 0.14rem 0 0.12rem;
  }
}
</style>
