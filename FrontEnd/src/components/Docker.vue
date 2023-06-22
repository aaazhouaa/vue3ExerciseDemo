<script setup>
import { RouterLink, useRoute } from "vue-router"
import { reactive, watch } from "vue"

const dockerList = reactive([
  { icon: "&#xe6cb;", desc: "首页", active: false, to: "/" },
  { icon: "&#xe621;", desc: "发现", active: false, to: "/find" },
  { icon: "&#xe73d;", desc: "购物车", active: false, to: "/cart" },
  { icon: "&#xe897;", desc: "订单", active: false, to: "/order" },
  { icon: "&#xe602;", desc: "我的", active: false, to: "/mine" },
])

const route = useRoute()

// 改变当前导航栏的字体颜色
watch(route, () => {
  // 将所有元素的active属性重置为false
  for (let i = 0; i < dockerList.length; i++) {
    dockerList[i].active = false
  }

  // 检查当前路由是否与数组中的任何一个路由匹配
  for (let i = 0; i < dockerList.length; i++) {
    if (route.path === dockerList[i].to) {
      dockerList[i].active = true
    }
  }
})
</script>

<template>
  <!-- 底栏 -->
  <div class="docker">
    <div class="component" v-for="(item, index) in dockerList" :key="item.icon">
      <RouterLink :to="item.to" class="docker__items" href="#">
        <i
          v-html="item.icon"
          :class="{ active: item.active }"
          class="docker__items__icon iconfont"
        ></i>
        <div :class="{ active: item.active }" class="docker__items__desc">
          {{ item.desc }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/viriables.scss";

// 底栏
.docker {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #dadbe0;
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  z-index: 9;

  // 设置每个RouterLink的宽度
  .component {
    width: 20%;
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 0.5rem;

    &__icon {
      width: 0.25rem;
      height: 0.25rem;
      font-size: 0.25rem;
    }

    &__desc {
      font-size: 0.12rem;
      color: $content-fontColor;
    }
  }

  // 当前选中字体的颜色
  .active {
    color: #3edb68;
  }
}
</style>
