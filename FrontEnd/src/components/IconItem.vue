<script setup>
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/counter"

const router = useRouter()
const store = useAuthStore()

const props = defineProps(["items"])
const [item] = props.items

// 引用这个组件组要传递 包含这5个值的对象
// 不展示绿色按钮 就不要传 desc,to 这两个属性 或赋值为空字符串
const { icon, title, text, desc, to } = item
</script>

<template>
  <div :style="{ height: item.outerHeight, marginTop: item.top }" class="item">
    <div :style="{ height: item.height, width: item.width }" class="item__img">
      <img :src="icon" alt="" />
    </div>
    <div class="item__text">
      <div class="first">{{ title }}</div>
      <div class="second">{{ text }}</div>
    </div>

    <div v-if="desc" @click="router.push(to)" class="item__desc">
      <div class="text">
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/mixins.scss";
.item {
  width: 100%;
  height: 100vh;
  margin-top: 1.2rem;
  padding: 0 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  box-sizing: border-box;

  &__img {
    width: 1.6rem;
    height: 1.6rem;

    img {
      width: 100%;
    }
  }

  &__text {
    text-align: center;

    .first {
      font-size: 0.14rem;
      font-weight: bold;
      color: #666666;
      margin-top: 0.08rem;
      @include ellipse;
    }

    .second {
      font-size: 0.12rem;
      color: #999999;
      margin-top: 0.06rem;
      @include ellipse2;
    }
  }

  &__desc {
    width: 1.2rem;
    height: 0.4rem;
    margin-top: 0.12rem;
    background-color: #00cf37;
    border-radius: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      font-size: 0.14rem;
      color: #fff;
    }
  }
}
</style>
