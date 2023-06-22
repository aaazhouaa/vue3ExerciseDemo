<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useShopStore } from "../../stores/shop"
import { computed } from "@vue/reactivity"
import { confirmData, confirmFn } from "../../utils/confirm"
import { useAuthStore } from "../../stores/counter"
import { toast } from "../../utils/toast"

const route = useRoute()
const store = useShopStore()
const authStore = useAuthStore()
console.log(authStore.userAddress[0])

// 已勾选商品总价
const price = computed(() => {
  if (store.cart[route.params.id]?.product) {
    // 定义商品
    const product = store.cart[route.params.id].product
    let price = 0
    for (let i in product) {
      if (product[i].checked) {
        // 判断是否勾选 勾选了才计入总价
        price = Number((price + product[i].now * product[i].count).toFixed(2))
      }
    }
    return price
  }
})

// 号码保护开关
const current = ref(true)
// 包装服务
const checked = ref(true)

// 付款商品
const product = computed(() => {
  // 待会把需要付款的商品 push到这个数组中
  let productList = []
  if (store.cart[route.params.id]?.product) {
    const product = store.cart[route.params.id].product
    for (let key in product) {
      // 已勾选的商品
      if (product[key].checked) {
        // 添加到数组中
        productList.push(product[key])
      }
    }
  }
  return productList
})

// 提交订单
function submit() {
  if (authStore.userAddress[0]) {
    confirmFn(
      ["到这里就结束了", "支付接口我没写,这里就是调用后端接口完成支付"],
      () => (confirmData.show = false)
    )
  } else {
    toast("请选择收货地址")
  }
}
</script>

<template>
  <div class="product-list">
    <!-- 店铺名称 -->
    <div class="shop-name">
      <div class="title">山姆会员商店</div>
      <div class="tip">达达快送</div>
    </div>
    <!-- 商品信息 -->
    <div v-for="item in product" class="product">
      <div class="img">
        <img :src="item.img" alt="" />
      </div>
      <div class="info">
        <div class="product-name">{{ item.title }}</div>
        <div class="price-info">
          <div class="price-count">¥{{ item.now }} × {{ item.count }}</div>
          <!-- 保留小数后两位 -->
          <div class="price">¥{{ (item.now * item.count).toFixed(2) }}</div>
        </div>
      </div>
    </div>
    <!-- 运费等信息 -->
    <ul class="message">
      <li>运费 <span>¥10</span></li>
      <li>时段运费 <span>¥2</span></li>
      <li>满9元享特惠 <span style="color: #ff5757">-¥2</span></li>
      <li>
        包装服务
        <span @click="checked = !checked" class="check"
          >¥1
          <div class="icon" :class="{ uncheck: !checked }"></div>
        </span>
      </li>
      <li class="ad">
        <span> 红包</span>
        <div class="icon">
          <img
            style="width: 0.3rem"
            src="../../../public/imgs/pay-v+.png"
            alt=""
          />
          <span>领</span>
          <span style="color: #ff1e19">4</span>
          <span>元会员红包</span>
        </div>
      </li>
      <li>
        <span>优惠券<i class="iconfont">&#xe71d;</i> </span
        ><span>暂无优惠券</span>
      </li>
    </ul>
    <!-- 实付金额 -->
    <ul class="total-price">
      <span>实付金额</span>
      <!-- 勾选了包装服务总金额就 加一  -->
      <div class="need-pay">¥{{ checked ? price + 1 || 0 : price || 0 }}</div>
    </ul>
  </div>
  <!-- 号码保护 -->
  <div class="phone-protection">
    <div class="text">
      <span class="title">号码保护<i class="iconfont">&#xe71d;</i></span>
      <div
        @click="current = !current"
        class="switch"
        :class="{ close: current === false, open: current === true }"
      >
        <div
          class="switch-sign"
          :class="{ close: current === false, open: current === true }"
        ></div>
      </div>
    </div>
    <div class="tips">对商家、骑手隐藏您的真实手机号，保护您的隐私</div>
  </div>
  <!-- 备注等信息 -->
  <ul class="other">
    <li>
      <span class="text">备注</span>
      <span>未填写 <i class="iconfont">&#xe630;</i> </span>
    </li>
    <li>
      <span class="text">发票</span>
      <span>未选择 <i class="iconfont">&#xe630;</i> </span>
    </li>
    <li>
      <span class="text">如遇缺货</span>
      <span style="color: #333"
        >缺货时电话与我沟通 <i class="iconfont">&#xe630;</i>
      </span>
    </li>
  </ul>
  <!-- 底栏 -->
  <div class="docker">
    <!-- 勾选了包装服务总金额就 加一  -->
    <div class="need-to-pay">¥{{ checked ? price + 1 || 0 : price || 0 }}</div>
    <div @click="submit()" class="btn">
      <div class="text">提交订单</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.product-list {
  display: flex;
  flex-direction: column;
  padding: 0.15rem 0.15rem;
  margin: 0 0.1rem 0.1rem;
  font-size: 0.14rem;
  color: #333;
  border-radius: 0.12rem;
  background-color: #fff;
  // 店铺名称
  .shop-name {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.15rem;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #f8f8f8;

    .title {
      font-size: 0.16rem;
      font-weight: bold;
      @include ellipse;
    }
    .tip {
      height: 0.16rem;
      padding: 0 0.03rem;
      font-size: 0.12rem;
      color: #0077ee;
      border: 0.01rem solid #91c4f7;
      border-radius: 0.04rem;
    }
  }
  // 商品信息
  .product {
    display: flex;
    margin-top: 0.12rem;
    padding: 0.12rem 0;
    .img {
      margin-right: 0.1rem;
      img {
        width: 0.56rem;
        height: 0.56rem;
      }
    }
    .info {
      display: flex;
      flex: auto;
      gap: 0.14rem;
      flex-direction: column;
      .product-name {
        margin-left: 0.03rem;
        @include ellipse;
      }
      .price-info {
        display: flex;

        justify-content: space-between;
      }
      .price {
        font-weight: bold;
      }
    }
  }
  // 运费等信息
  .message {
    display: flex;
    flex-direction: column;
    gap: 0.16rem;
    li {
      display: flex;
      justify-content: space-between;
    }
    // 包装服务
    .check {
      display: flex;
      .icon {
        margin-left: 0.03rem;
        width: 0.22rem;
        height: 0.22rem;
        background-image: url("../../../imgs/shop/勾选.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
      .uncheck {
        background-image: url("../../../imgs/shop/未勾选.png");
      }
    }

    // 会员红包信息
    .ad {
      display: flex;
      .icon {
        display: flex;
        align-items: center;
        width: 1.25rem;
        height: 0.18rem;
        font-size: 0.1rem;
        font-weight: bold;
        background-color: #fdd795;
        border-radius: 0.09rem;
      }
    }
  }

  // 实际付款
  .total-price {
    margin-top: 0.2rem;
    display: flex;
    justify-content: end;
    align-items: center;
    .need-pay {
      margin-left: 0.08rem;
      font-size: 0.22rem;
      font-weight: bold;
    }
  }
}
// 号码保护
.phone-protection {
  margin: 0 0.1rem 0.1rem;
  padding: 0.15rem 0.15rem;
  border-radius: 0.12rem;
  background-color: #fff;
  .text {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 0.16rem;
      font-weight: bold;
      i {
        font-weight: 400;
        margin-left: 0.05rem;
      }
    }
  }
  // 开关背景 关
  @keyframes background-close {
    from {
      background-color: #09bb07;
    }
    to {
      background-color: #dddddd;
    }
  }
  // 开关背景 开
  @keyframes background-open {
    from {
      background-color: #dddddd;
    }
    to {
      background-color: #09bb07;
    }
  }
  // 开关过渡动画 关
  @keyframes close-sign {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-0.15rem);
    }
  }
  // 开关过渡动画 开
  @keyframes open-sign {
    from {
      transform: translateX(-0.15rem);
    }
    to {
      transform: translateX(0);
    }
  }

  // 开关
  .switch {
    position: relative;
    display: flex;
    align-items: center;
    width: 0.36rem;
    height: 0.22rem;
    border-radius: 0.11rem;
    background-color: #09bb07;
    .switch-sign {
      position: absolute;
      right: 0;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      background-color: #fff;
    }
    // 开关过渡动画 关
    .close {
      animation: close-sign 0.25s linear;
      animation-fill-mode: forwards;
    }
    // 开关过渡动画 开
    .open {
      animation: open-sign 0.25s linear;
      animation-fill-mode: forwards;
    }
  }
  // 开关背景 关
  .close {
    animation: background-close 0.25s linear;
    animation-fill-mode: forwards;
  }
  // 开关背景 开
  .open {
    animation: background-open 0.25s linear;
    animation-fill-mode: forwards;
  }
  .tips {
    color: #999;
    @include ellipse;
  }
}
// 备注等信息
.other {
  display: flex;
  flex-direction: column;
  padding: 0 0.15rem;
  margin: 0 0.1rem 0.1rem;

  background-color: #fff;
  font-size: 0.14rem;
  border-radius: 0.12rem;
  li {
    display: flex;
    justify-content: space-between;
    color: #999;
    padding: 0.15rem 0;
    border-bottom: 0.01rem solid #f7f7f7;

    .text {
      color: #333;
      font-size: 0.16rem;
      font-weight: bold;
    }
  }
}
// 底栏
.docker {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.08rem 0;
  background-color: #fff;
  .need-to-pay {
    font-size: 0.18rem;
    font-weight: bold;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.1rem 0 0.12rem;
    width: 1.22rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: #0cd140;
    .text {
      font-size: 0.16rem;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>
