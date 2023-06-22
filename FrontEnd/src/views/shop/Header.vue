<script setup>
import { ref, onMounted } from "vue"
import { toast } from "../../utils/toast"
import { get } from "../../utils/request"
import { useRoute } from "vue-router"
import Search from "./Search.vue"

// 当前路由
const route = useRoute()

const shop = ref({})

onMounted(async () => {
  const res = await get(`/api/shop/${route.params.id}`)
  shop.value = res?.data
})

const active = ref(0)
</script>

<template>
  <div class="top">
    <div class="header">
      <div class="header__icon">
        <img :src="shop.img" alt="" />
      </div>
      <div class="header__content">
        <div class="title">{{ shop.name }}</div>
        <div class="time">{{ shop.time }}</div>
        <div class="freight">{{ shop.freight }}</div>
        <div
          v-if="active === 0"
          @click="
            () => {
              toast('已关注')
              active = 1
            }
          "
          class="iconfont"
        >
          &#xe83f;
        </div>
        <div
          v-if="active === 1"
          @click="
            () => {
              toast('已取消关注')
              active = 0
            }
          "
          class="iconfont active"
        >
          &#xe85c;
        </div>
      </div>
    </div>
    <div class="discount">
      <div class="first">
        <div class="icon1">{{ shop.tip }}</div>
        <div class="text">{{ shop.discount }}</div>
      </div>
      <div class="second">
        <div class="text">{{ shop.moreDiscount }}</div>
        <div class="icon2 iconfont">&#xe601;</div>
      </div>
    </div>
  </div>
  <Search :item="shop.allGoods"></Search>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.top {
  width: 100%;
  padding: 0.08rem 0.1rem 0.15rem;
  box-sizing: border-box;
  background-color: #fff;

  .header {
    position: relative;
    width: 100%;
    display: flex;

    &__icon {
      width: 0.68rem;
      height: 0.68rem;

      img {
        width: 100%;
      }
    }

    &__content {
      position: relative;
      flex: 1;
      height: 0.7rem;
      padding-left: 0.1rem;

      .title {
        display: flex;
        align-items: end;
        height: 0.22rem;
        font-size: 0.18rem;
        font-weight: bold;
        color: #333333;
        margin-bottom: 0.08rem;
        @include ellipse;
      }

      .time {
        color: #77779a;
        margin-bottom: 0.08rem;
        @include ellipse;
      }

      .freight {
        color: #333333;
        @include ellipse;
      }

      .iconfont {
        position: absolute;
        top: -0.07rem;
        right: -0.02rem;
        width: 0.3rem;
        height: 0.3rem;
        font-size: 0.26rem;
      }
      .active {
        color: red;
      }
    }
  }

  .discount {
    display: flex;
    margin-top: 0.15rem;
    width: 100%;
    height: 0.16rem;
    color: #666666;

    .first {
      display: flex;
      flex: auto;

      .icon1 {
        color: #fff;
        padding: 0 0.03rem;
        margin-right: 0.05rem;
        border-radius: 0.02rem;
        background-image: linear-gradient(
          135deg,
          rgb(255, 91, 87) 0%,
          rgb(255, 30, 25) 100%
        );
      }
    }
    .text {
      @include ellipse;
    }
    .second {
      display: flex;

      .icon2 {
        margin-left: 0.03rem;
        color: #bebebe;
        font-size: 0.15rem;
      }
    }
  }
}
</style>
