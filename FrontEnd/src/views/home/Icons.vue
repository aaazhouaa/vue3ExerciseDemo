<script setup>
import { onMounted, ref, onUnmounted } from "vue"
import { useRouter } from "vue-router"
import { get } from "../../utils/request"

const router = useRouter()

// 存储图标
const Icons = ref()

onMounted(async () => {
  const data = await get("/api/homeIcons")
  Icons.value = data.data
  // 滚动条
  parent.value.addEventListener("scroll", move)
})

// 移除监听事件
// onUnmounted(() => {
//   parent.value.removeEventListener("scroll", move)
// })

// 自定义滚动条
const parent = ref(null)
const bar = ref(null)

function move() {
  if (parent.value && bar.value) {
    const barOffset = (parent.value.scrollLeft / parent.value.scrollWidth) * 25
    bar.value.style.transform = `translateX(${barOffset}px)`
  }
}
</script>

<template>
  <!-- 商品类型 -->
  <div ref="parent" class="icons">
    <div class="icons__page">
      <div
        v-for="(item, index) in Icons"
        :key="index"
        @click="router.push(`/sort`)"
        class="icons__items"
      >
        <img :src="item.img" alt="" class="icons__items__img" />
        <span class="desc">{{ item.desc }}</span>
      </div>
    </div>
  </div>
  <div class="logo">
    <div class="logo__one">
      <div ref="bar" class="logo__two"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";

// 商品类型
.icons {
  overflow: scroll;
  padding: 0.1rem 0 0.1rem 0.05rem;
  box-sizing: border-box;
  &__page {
    display: flex;
    // 横向滚动
    flex-direction: column;
    flex-wrap: wrap;
    height: 37vw;
    margin-bottom: 0.1rem;
  }

  &__items {
    width: 20%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__img {
      width: 60%;
    }

    .desc {
      text-align: center;
      margin-top: 0.03rem;
      @include ellipse;
    }
  }
}
// 隐藏滚动条
@include scrollbar;

// 滚动条
.logo {
  position: relative;
  bottom: 0.16rem;
  z-index: 6;
  width: 100%;
  display: flex;
  justify-content: center;
  &__one {
    width: 0.25rem;
    height: 0.04rem;
    border-radius: 0.02rem;
    background-color: #ebebeb;
  }

  &__two {
    border-radius: 0.02rem;
    width: 0.12rem;
    height: 0.04rem;
    background-color: #00cf37;
  }
}
</style>
