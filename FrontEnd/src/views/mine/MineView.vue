<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../../stores/counter"
import { get } from "../../utils/request"
import Wallet from "./Wallet.vue"
import Icon from "./Icon.vue"
import Confirm from "../../components/Confirm.vue"
import { confirmFn } from "../../utils/confirm"

const store = useAuthStore()

const Icons = reactive({
  iconList1: [
    {
      sort: "功能服务",
      icons: [
        { icon: "../../../imgs/mine/1-1.png", desc: "我的关注" },
        { icon: "../../../imgs/mine/1-2.png", desc: "我的评价" },
        { icon: "../../../imgs/mine/1-3.png", desc: "我的地址" },
        { icon: "../../../imgs/mine/1-4.png", desc: "商家会员" },
        { icon: "../../../imgs/mine/1-5.png", desc: "V+会员" },
        { icon: "../../../imgs/mine/1-6.png", desc: "品牌会员" },
        { icon: "../../../imgs/mine/1-7.png", desc: "售后退款" },
        { icon: "../../../imgs/mine/1-8.png", desc: "客服与帮助" },
      ],
    },
  ],
  iconList2: [
    {
      sort: "互动玩乐",
      icons: [
        { icon: "../../../imgs/mine/2-1.png", desc: "我的关注" },
        { icon: "../../../imgs/mine/2-2.png", desc: "我的评价" },
        { icon: "../../../imgs/mine/2-3.png", desc: "我的地址" },
        { icon: "../../../imgs/mine/2-4.png", desc: "商家会员" },
      ],
    },
  ],
  iconList3: [
    {
      sort: "功能服务",
      icons: [
        { icon: "../../../imgs/mine/3-1.png", desc: "我的关注" },
        { icon: "../../../imgs/mine/3-2.png", desc: "我的评价" },
        { icon: "../../../imgs/mine/3-3.png", desc: "我的地址" },
        { icon: "../../../imgs/mine/3-4.png", desc: "商家会员" },
        { icon: "../../../imgs/mine/3-5.png", desc: "V+会员" },
        { icon: "../../../imgs/mine/3-6.png", desc: "品牌会员" },
      ],
    },
  ],
  iconList4: [
    {
      sort: "功能服务",
      icons: [
        { icon: "../../../imgs/mine/4-1.png", desc: "我的关注" },
        { icon: "../../../imgs/mine/4-2.png", desc: "我的评价" },
        { icon: "../../../imgs/mine/4-3.png", desc: "我的地址" },
        { icon: "../../../imgs/mine/4-4.png", desc: "商家会员" },
        { icon: "../../../imgs/mine/4-5.png", desc: "V+会员" },
        { icon: "../../../imgs/mine/4-6.png", desc: "品牌会员" },
        { icon: "../../../imgs/mine/4-7.png", desc: "售后退款" },
      ],
    },
  ],
})

const router = useRouter()
const toPage = () => {
  if (store.isAuthenticate) {
    router.push(`/info/${store.user.id}`)
  } else {
    router.push("/login")
  }
}

// 退出后恢复默认数据
function loginOut() {
  // 清除localStorage中的数据
  localStorage.clear()
  // 刷新当前页面
  router.go(0)
}
</script>

<template>
  <div class="wrapper">
    <div class="top">
      <img src="../../../public/imgs/MineBg.png" alt="" class="top__bg" />
      <div class="walletBg"></div>
      <div class="top__icon">
        <img src="../../../public/imgs/消息.png" alt="" />
      </div>

      <!-- 跳转到登录注册路由 -->
      <!-- <RouterLink to="/login"> -->
      <div @click="toPage" class="top__desc">
        <div class="top__desc__img">
          <img
            :src="store.getUser.img"
            src="../../../public/imgs/mineheadicon.png"
            alt=""
          />
        </div>

        <div class="top__desc__text">
          <div class="top__desc__text__name">
            {{ store.getUser.nickname }}
          </div>
          <div class="top__desc__text__icon">
            <div class="iconfont">&#xe618;</div>
          </div>
        </div>
      </div>
      <!-- </RouterLink> -->
    </div>
    <div class="content">
      <Wallet></Wallet>
      <div class="ad">
        <img src="../../../public/imgs/mine/AD.png" alt="" />
      </div>
      <Icon :items="Icons.iconList1"></Icon>
      <Icon :items="Icons.iconList2"></Icon>
      <Icon :items="Icons.iconList3"></Icon>
      <Icon :items="Icons.iconList4"></Icon>

      <!-- 判断是否登录 -->
      <div
        v-if="store.getAuth"
        @click="confirmFn(['确定要退出吗?'], () => loginOut())"
        class="outLogin"
      >
        退出登录
      </div>
      <Confirm></Confirm>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";

.wrapper {
  padding-bottom: 1.2rem;
  overflow: hidden;
  .top {
    position: relative;
    width: 100%;
    height: 2rem;

    &__bg {
      position: absolute;
      width: 100%;
      height: 2rem;
      z-index: -1;
    }

    .walletBg {
      position: absolute;
      bottom: 0;
      z-index: -1;
      width: 100%;
      height: 0.24rem;
      background-image: url("../../../imgs/user_wallet_bg.png");
      background-size: 100%;
    }

    &__icon {
      position: absolute;
      right: 0.16rem;
      top: 0.16rem;
      width: 0.22rem;
      height: 0.22rem;

      img {
        width: 100%;
      }
    }

    // 用户头像与名称
    &__desc {
      position: absolute;
      left: 0.16rem;
      bottom: 0.84rem;
      display: flex;
      justify-content: start;
      width: 1.8rem;

      &__img {
        width: 0.52rem;
        height: 0.52rem;
        background-color: #fff;
        border: 1px solid rgb(255, 255, 255);
        border-width: 0.02rem;
        border-radius: 50%;
        box-sizing: border-box;
        overflow: hidden;
      }

      img {
        width: 100%;
      }

      // 用户名
      &__text {
        display: flex;
        flex: 1;
        margin-left: 0.12rem;
        line-height: 0.53rem;
        height: 0.52rem;
        font-size: 0.16rem;
        font-weight: bold;
        color: #fff;

        &__name {
          @include ellipse;
        }

        &__icon {
          position: relative;
          font-size: 0.17rem;
          font-weight: 200;

          .iconfont {
            position: absolute;
            left: -3px;
          }
        }
      }
    }
  }

  .content {
    position: relative;
    z-index: 0;
    height: 8.7rem;
    margin: -0.64rem 0.12rem 0;
    padding: 0.12em 0;

    .ad {
      width: 100%;
      margin-top: 0.12rem;
      border-radius: 0.12rem;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
    .outLogin {
      height: 0.46rem;
      margin: 0.12rem 0;
      line-height: 0.46rem;
      text-align: center;
      border-radius: 0.1rem;
      background-color: #fff;
    }
  }
}

// todo隐藏滚动条
@include scrollbar;
</style>
