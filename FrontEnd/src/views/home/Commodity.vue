<script setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { get } from "../../utils/request"

const router = useRouter()
// 存储接收的数据
const List = ref()

onMounted(async () => {
  const shop = await get(`/api/shop`)
  List.value = shop.data
})
</script>

<template>
  <div class="outer">
    <div
      v-for="(item, index) in List"
      :key="item.productId"
      @click="router.push(`/shop/${item.shopId}`)"
      class="outer__items"
    >
      <div>
        <div class="img">
          <img :src="item.img" alt="" />
        </div>
        <div class="title">{{ item.title }}</div>
        <div>
          <span class="tip">{{ item.tip }}</span>
        </div>
        <div class="discount">
          <span class="text">
            <div class="icon"></div>
            {{ item.discount }}
            <div class="icon2"></div>
          </span>
        </div>
        <div class="price">{{ item.price }}</div>
      </div>
      <div class="items__store">
        <div class="img">
          <img :src="item.shopImg" alt="" />
        </div>
        <div class="about">
          <div class="text">{{ item.shopName }}</div>
          <div class="freight">{{ item.freight }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.outer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &__items {
    width: 49%;
    // width: 45.5vw;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.15rem;
    overflow: hidden;
    margin-bottom: 0.08rem;
    .img {
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 0.14rem;
      font-weight: bold;
      color: #333;
      margin: 0.04rem 0.08rem 0;
      @include ellipse;
    }
    .tip {
      padding: 0 0.03rem;
      margin: 0.04rem 0 0 0.08rem;
      color: rgb(255, 30, 26);
      background-color: rgb(255, 243, 243);
      @include ellipse;
      display: inline-block;
    }
    .discount {
      margin-top: 0.08rem;
      padding-left: 0.08rem;
      .text {
        position: relative;
        @include ellipse;
        display: inline-block;
        padding: 0 0.04rem;
        color: #ff1e19;
        border: 0.01rem solid #ffafad;

        .icon,
        .icon2 {
          position: absolute;
          bottom: 0.04rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;

          background-color: rgb(255, 255, 255);
        }
        .icon {
          left: -0.06rem;
          border-right: 0.01rem solid rgb(255, 142, 140);
        }
        .icon2 {
          right: -0.06rem;
          border-left: 0.01rem solid rgb(255, 142, 140);
        }
      }
    }
    .price {
      font-size: 0.18rem;
      color: #ff1e19;
      padding-left: 0.08rem;
    }
    .items__store {
      display: flex;
      margin: 0.08rem 0.08rem 0;
      padding: 0.08rem 0;
      .img {
        width: 0.26rem;
        height: 0.26rem;
        margin-right: 0.04rem;
        img {
          width: 100%;
        }
      }
      .text {
        color: #333;
        @include ellipse;
      }
      .freight {
        color: #666;
      }
    }
  }
}
</style>
