<script setup>
import { onMounted, reactive } from "vue"
import { get } from "../../utils/request"
import { useRoute } from "vue-router"
import { useShopStore } from "../../stores/shop"
import { toast } from "../../utils/toast"

const route = useRoute()
const store = useShopStore()

// 存储商品列表
const Data = reactive({ items: {} })

onMounted(async () => {
  const data = await get(`/api/shopHome/${route.params.id}`)
  Data.items = data.data
})

// // 需包含 {title, data:{img,discount,title,now}}
// const props = defineProps(["items"])
// const CargoList = props.items
</script>

<template>
  <div class="cart-items">
    <div
      v-for="(items, index) in Data.items.categories"
      class="cart-items__cargo"
    >
      <div class="cart-items__cargo__top">
        <div class="cart-items__cargo__top__title">
          {{ items.title }}
        </div>
        <div class="cart-items__cargo__top__more">
          <div class="cart-items__cargo__top__text">更多</div>
          <div class="cart-items__cargo__top__icon iconfont">&#xe601;</div>
        </div>
      </div>

      <div class="cart-items__cargo__wrapper">
        <div
          v-for="(item, index) in items.products"
          class="cart-items__cargo__wrapper__items"
        >
          <div
            @click="toast(`别点了，没写商品详情页`)"
            class="cart-items__cargo__wrapper__items__icon"
          >
            <div class="img">
              <img :src="item.img" alt="" />
            </div>
            <div v-if="item.discount" class="discount">{{ item.discount }}</div>
          </div>
          <div class="cart-items__cargo__wrapper__items__name">
            {{ item.title }}
          </div>
          <div class="cart-items__cargo__wrapper__items__price">
            <div class="now">¥{{ item.now }}</div>
            <div class="icon__plus">
              <div
                v-if="store.cart[route.params.id]?.product[item.id]?.count"
                class="count"
              >
                {{ store.cart[route.params.id]?.product[item.id]?.count || 0 }}
              </div>
              <img
                @click="
                  store.changeCartItem(
                    route.params.id,
                    item.id,
                    item,
                    1,
                    Data.items.name
                  )
                "
                src="../../../public/imgs/shop/+.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";

.cart-items {
  height: 66vh;
  overflow-y: scroll;
  &__cargo {
    margin: 0.06rem 0 0.08rem;
    padding-left: 0.1rem;

    &__top {
      display: flex;
      align-items: end;
      padding: 0.1rem 0;
      background-color: #f8f8f8;

      &__title {
        font-size: 0.18rem;
        font-weight: bold;
        flex: 1;
      }
      &__more {
        display: flex;
        height: 0.16rem;
        padding-right: 0.1rem;

        &__text {
          font-size: 0.12rem;
        }

        .iconfont {
          font-size: 0.14rem;
          transform: rotate(-90deg);
        }
      }
    }

    &__wrapper {
      margin-right: 0.1rem;
      border-radius: 0.06rem;
      background-color: #fff;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;

      &__items {
        width: 30%;
        padding-top: 0.1rem;
        z-index: 0;
        box-sizing: border-box;

        &__icon {
          position: relative;
          border-radius: 0.05rem;
          overflow: hidden;
          background-color: rgba(0, 0, 0, 0.03);
          .img {
            padding-bottom: 100%;

            img {
              position: absolute;
              width: 100%;
              z-index: -1;
            }
          }
          .discount {
            width: 80%;
            height: 0.16rem;
            font-size: 0.1rem;
            color: #fff;
            padding: 0 0.03rem;
            @include ellipse;
            @include bgColor;
            border-top-right-radius: 4px;
            border-bottom-left-radius: 4px;
          }
        }

        &__name {
          height: 0.34rem;
          margin-top: 0.04rem;
          @include ellipse2;
        }

        &__price {
          height: 0.35rem;
          font-size: 0.14rem;
          font-weight: bold;
          color: #ff1e19;
          padding-bottom: 0.03rem;
          margin-top: 0.05rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .icon__plus {
            position: relative;
            width: 0.23rem;
            height: 0.23rem;
            padding-right: 0.06rem;

            // 当前商品加入购物车的数量
            .count {
              position: absolute;
              top: -0.08rem;
              right: -0rem;
              width: 0.16rem;
              height: 0.16rem;
              text-align: center;
              font-size: 0.12rem;
              font-weight: 400;
              color: #f8f8f8;
              border-radius: 50%;
              background-color: #ff1e19;
            }
          }
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
