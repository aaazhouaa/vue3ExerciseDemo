<script setup>
import { useShopStore } from "../../stores/shop"
import { confirmFn } from "../../utils/confirm"
import { computed } from "vue"
const store = useShopStore()

const props = defineProps(["cart"])
const cart = computed(() => props.cart)

// 当商品仅剩一份时 弹出对话框
function fn(shopId, productId, product) {
  if (product.count === 1) {
    confirmFn(["确定删除该商品吗?"], () =>
      store.changeCartItem(shopId, productId, product, -1)
    )
  } else {
    store.changeCartItem(shopId, productId, product, -1)
  }
}
</script>
<template>
  <template v-for="item in cart.product" :key="item.id">
    <div v-if="item.count" class="cart-info">
      <!-- 勾选状态 -->
      <div class="checked">
        <!-- 默认是勾选状态 所以点击变为未勾选状态 应该减少价格 -->
        <img
          v-if="item.checked"
          @click="item.checked = !item.checked"
          src="../../../public/imgs/shop/勾选.png"
          alt=""
        />
        <img
          v-if="!item.checked"
          @click="item.checked = !item.checked"
          src="../../../public/imgs/shop/未勾选.png"
          alt=""
        />
      </div>
      <div class="content">
        <div class="img">
          <img :src="item.img" alt="" />
        </div>
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="spike">秒杀</div>
          <div class="items">
            <div class="price">
              <div class="now">¥{{ item.now }}</div>
              <div v-if="item.pre" class="pre">¥{{ item.pre }}</div>
            </div>
            <div class="count">
              <!-- 删除商品时弹出对话框 -->
              <div
                @click="fn(cart.shopId, item.id, item)"
                class="less iconfont"
              >
                &#xeaf5;
              </div>
              <div class="number">{{ item.count }}</div>
              <div
                @click="store.changeCartItem(cart.shopId, item.id, item, 1)"
                class="add iconfont"
              >
                &#xeaf3;
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="icon"></div>
    </div>
  </template>
</template>
<style lang="scss" scoped>
@import "../../style/mixins.scss";
.cart-info {
  display: flex;
  width: 100%;
  background-color: #fff2f2;
  border-radius: 0.12rem;
  margin-bottom: 0.12rem;

  // 勾选商品
  .checked {
    margin-top: 0.25rem;
    margin-right: 0.08rem;
    padding-left: 0.05rem;
    img {
      width: 0.22rem;
      height: 0.22rem;
    }
    .icon {
      background-image: url("../../../imgs/shop/勾选.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
    .uncheck {
      background-image: url("../../../imgs/shop/未勾选.png");
    }
  }

  // 商品相关信息
  .content {
    // 商品数量定位
    position: relative;
    display: flex;
    width: 100%;
    padding: 0.12rem 0;
    box-sizing: border-box;
    font-size: 0.14rem;

    // 商品图片
    img {
      margin-right: 0.08rem;
      border-radius: 0.05rem;
      width: 0.5rem;
      height: 0.5rem;
    }

    .info {
      // 商品名称
      .title {
        @include ellipse;
        color: #333;
      }
    }
    .spike {
      display: inline-block;
      font-size: 0.12rem;
      padding: 0 0.02rem;
      margin-top: 0.05rem;
      color: #ff1e1a;
      border: 0.01rem solid #ff9290;
      border-radius: 0.05rem;
    }
    // 价格和数量
    .items {
      display: flex;
      justify-content: space-between;
      margin-top: 0.08rem;
      padding-top: 0.08rem;
      box-sizing: border-box;

      // 价格
      .price {
        display: flex;
        .now {
          color: #ff1e2d;
          font-weight: bold;
        }
        .pre {
          margin-left: 0.05rem;
          color: #9ba5bd;
          text-decoration: line-through;
        }
      }

      // 数量
      .count {
        position: absolute;
        right: 0.05rem;
        display: flex;
        align-items: center;
        text-align: center;
        width: 0.9rem;
        border: 0.01rem solid rgb(238, 238, 238);
        border-radius: 0.1rem;
        .iconfont {
          flex: 1;
          font-size: 0.12rem;
        }
        .number {
          flex: auto;
          border-left: 0.01rem solid rgb(238, 238, 238);
          border-right: 0.01rem solid rgb(238, 238, 238);
        }
      }
    }
  }
  // 今日加购图标
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    background-image: url("../../../imgs/shop/今日加购.png");
    background-position: top right;
    background-size: 0.3rem 0.3rem;
    background-repeat: no-repeat;
  }
}
</style>
