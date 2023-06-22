<script setup>
import { onMounted, reactive } from "vue"
import Icon from "./Icon.vue"
import { useRoute } from "vue-router"
import { get } from "../../utils/request"

const route = useRoute()

const Data = reactive({
  SideList: [], // 侧边菜单栏
  selectedIndex: 0, // 当前被选中的分类的索引值
  tabCategory: [], // 当前被选中的侧边栏菜单中的商品
})

onMounted(async () => {
  const data = await get(`/api/shopSideBar/${route.params.id}`)
  if (data?.status === "ok") {
    // 直接把后端sideBar数组赋值给SideList
    Data.SideList = data.data.sideBar

    // 让页面加载后显示侧边栏菜单中第一个分类的商品
    getTabCategory(Data.SideList[0].tab) // 把SideList中第一个元素的tab值作为参数传递
  }
})

async function getTabCategory(tab) {
  const tabData = await get(`/api/shopAll/${route.params.id}`, { tab }) // query中 tab分类
  if (tabData?.status === "ok") {
    Data.tabCategory = tabData.data
  } else {
    console.error(tab, "error")
  }
}
</script>

<template>
  <div class="all">
    <div class="all__menu">
      <div
        v-for="(item, index) in Data.SideList"
        @click=";(Data.selectedIndex = index), getTabCategory(item.tab)"
        class="all__menu__title"
        :class="{ active: Data.selectedIndex === index }"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="all__content">
      <div class="all__content__top">
        <div class="all__content__top__select iconfont">综合排序&#xe601;</div>
        <div class="all__content__top__text">减免运费</div>
      </div>
      <Icon
        :items="Data.tabCategory"
        v-if="Data.tabCategory && Data.tabCategory.length > 0"
      ></Icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.all {
  display: flex;
  &__menu {
    width: 0.8rem;
    &__title {
      font-size: 0.14rem;
      padding: 0.16rem 0.12rem;
    }
    .active {
      position: relative;
      z-index: 1;
      width: 58px;
      background-color: #fff;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.06);
    }
  }

  &__content {
    width: 100%;
    height: 57vh;
    padding: 0.1rem 0 0.1rem 0.12rem;
    background-color: #fff;
    overflow-y: scroll;
    overflow-x: hidden;

    &__top {
      display: flex;
      box-sizing: border-box;
      color: #666666;

      &__select {
        padding-right: 0.08rem;
        font-size: 0.1rem;
      }
    }
  }
}
</style>
