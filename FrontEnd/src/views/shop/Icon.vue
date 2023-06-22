<script setup>
import { computed } from "@vue/reactivity"
import { useShopStore } from "../../stores/shop"
import { useRoute } from "vue-router"

const route = useRoute()
const store = useShopStore()

const props = defineProps(["items"])
// 得实时获取最新值 不然永远只显示第一次接收的数据
const items = computed(() => props.items)
// const count = ref(0)
// function a(price) {
//   console.log(price)
// }
// const emit = defineEmits(["count"])
// emit("count",count)
</script>

<template>
  <div v-for="item in items[1]" :key="item.id" class="all__content__cargo">
    <div class="picture">
      <img :src="item.img" alt="" />
      <div class="residue">{{ item.residue }}</div>
    </div>
    <div class="desc">
      <div class="title">{{ item.title }}</div>
      <div class="sell">{{ item.sell }}</div>
      <div class="discount">{{ item.discount }}</div>
      <div class="price">
        <div class="now">
          ¥{{ item.now }}
          <div class="icons">
            <img
              @click="
                store.changeCartItem(
                  route.params.id,
                  item.id,
                  item,
                  -1,
                  items[0]
                )
              "
              src="../../../public/imgs/shop/-.png"
              alt=""
              class="less"
            />
            <div class="amount">
              {{ store.cart[route.params.id]?.product[item.id]?.count || 0 }}
            </div>
            <img
              @click="
                store.changeCartItem(
                  route.params.id,
                  item.id,
                  item,
                  1,
                  items[0]
                )
              "
              src="../../../public/imgs/shop/+.png"
              alt=""
              class="add"
            />
          </div>
        </div>
        <div class="pre">¥{{ item.pre }}</div>
        <div class="icon"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.all__content__cargo {
  display: flex;
  padding: 0.16rem 0.1rem;
  .picture {
    display: flex;
    flex-direction: column;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
    .residue {
      text-align: center;
      color: #fff;
      background-image: linear-gradient(
        135deg,
        rgb(255, 92, 55) 0%,
        rgb(255, 146, 72) 100%
      );
      border-radius: 0.04rem;
      border-top-left-radius: 0;
    }
  }
  .desc {
    flex: auto;
    margin-left: 0.08rem;
    .title {
      font-size: 0.16rem;
      font-weight: bold;
      color: #333333;
      @include ellipse2;
    }
    .sell {
      margin-top: 0.04rem;
      color: #666666;
    }
    .discount {
      display: inline-block;
      margin-top: 0.04rem;
      padding: 0 0.03rem;
      color: rgb(255, 30, 26);
      border: 0.01rem solid rgb(255, 142, 140);
      border-radius: 0.03rem;
    }
    .price {
      position: relative;
      margin-top: 0.1rem;
      .now {
        display: flex;
        justify-content: space-between;
        font-size: 0.18rem;
        font-weight: bold;
        color: red;

        // + - 图标
        .icons {
          display: flex;
          // 两个图标的公共大小
          img {
            width: 0.23rem;
            height: 0.23rem;
          }
          // 数量
          .amount {
            width: 0.32rem;
            text-align: center;
            font-size: 0.16rem;
            color: #333333;
            font-weight: 400;
          }
        }
      }
      .pre {
        font-size: 0.13rem;
        color: #999999;
        text-decoration-line: line-through;
      }
      .icon {
        position: absolute;
        right: -0.3rem;
        bottom: 0.1rem;
        width: 0.23rem;
        height: 0.23rem;
      }
    }
  }
}
</style>
