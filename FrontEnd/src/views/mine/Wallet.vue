<script setup>
import { reactive } from "vue"

const walletList = reactive([
  { icon: "../../../imgs/icon_wallet.png", desc: "我的钱包" },
  { icon: "-", desc: "红包" },
  { icon: "-", desc: "优惠券" },
  { icon: "-", desc: "鲜豆" },
  { icon: "-", desc: "白条" },
])
</script>

<template>
  <!-- 钱包 -->
  <div class="wallet">
    <div
      v-for="(item, index) in walletList"
      :class="{ item__first: index === 0 }"
      class="wallet__item"
    >
      <div
        :class="{ item__first__icon: index === 0 }"
        class="wallet__item__icon"
      >
        {{ index === 0 ? "" : item.icon }}
        <img :src="item.icon" alt="" />
      </div>
      <div class="wallet__item__desc">{{ item.desc }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.wallet {
  width: 100%;
  height: 0.8rem;
  background-color: #fff;
  border-radius: 0.12rem;
  margin: 0 auto;
  padding: 0.12rem 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  &__item {
    width: 0.68rem;
    height: 0.58rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;

    &__icon {
      height: 0.34rem;
      font-size: 0.2rem;
      font-weight: bold;
      padding: 0.04rem 0 0 0.04rem;
      margin-bottom: 0.02rem;
    }

    &__desc {
      padding-bottom: 0.07rem;
      @include ellipse;
    }
  }

  // 我的钱包
  .item__first {
    width: 0.8rem;
    height: 0.58rem;
    background-image: url("../../../imgs/user_wellat_border.png");
    background-position: bottom 0 right -0.03rem;
    background-size: 0.1rem 0.56rem;
    background-repeat: no-repeat;

    &__icon {
      width: 0.32rem;
      height: 0.32rem;

      img {
        width: 100%;
      }
    }
  }
}
</style>
