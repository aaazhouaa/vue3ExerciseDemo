<script setup>
import { reactive } from "vue"
import { countDown } from "../../utils/countDown"

// 存储countDown里面的倒计时
let time = reactive({
  item: {},
})

countDown("2023-6-18 00:00", (data) => {
  time.item = data
})

const goodList = reactive([
  {
    iconUrl: "../../../imgs/ad里面的商品.jpg",
    discount: "../../../imgs/用券立减背景.png",
    text: "用券立减",
    title: "安慕希常温酸奶原味205g*12盒/箱",
    price: "￥39.9",
    pre: "￥54.8",
  },
  {
    iconUrl: "../../../imgs/ad里面的商品.jpg",
    discount: "../../../imgs/用券立减背景.png",
    text: "用券立减",
    title: "安慕希常温酸奶原味205g*12盒/箱",
    price: "￥39.9",
    pre: "￥54.8",
  },
  {
    iconUrl: "../../../imgs/ad里面的商品.jpg",
    discount: "../../../imgs/用券立减背景.png",
    text: "用券立减",
    title: "安慕希常温酸奶原味205g*12盒/箱",
    price: "￥39.9",
    pre: "￥54.8",
  },
  {
    iconUrl: "../../../imgs/ad里面的商品.jpg",
    discount: "../../../imgs/用券立减背景.png",
    text: "用券立减",
    title: "安慕希常温酸奶原味205g*12盒/箱",
    price: "￥39.9",
    pre: "￥54.8",
  },
  {
    iconUrl: "../../../imgs/ad里面的商品.jpg",
    discount: "../../../imgs/用券立减背景.png",
    text: "用券立减",
    title: "安慕希常温酸奶原味205g*12盒/箱",
    price: "￥39.9",
    pre: "￥54.8",
  },
])
</script>

<template>
  <!-- AD-->
  <div class="ad">
    <div class="ad__items">
      <div class="ad__items__one">
        <img src="../../../public/imgs/新人专享文字.png" alt="" />

        <div id="outer">
          <div class="ad__items__one__countDown">
            <span
              v-if="time.item.resTime"
              class="ad__items__one__countDown__desc"
              >{{ time.item.hour }}: {{ time.item.minute }}:
              {{ time.item.seconds }}
              即将失效</span
            >
          </div>
        </div>
        <!-- <div></div> -->
      </div>
      <div class="ad__items__two">
        <img
          class="ad__items__two__coupons"
          src="../../../public/imgs/店铺券.png"
          alt=""
        />
      </div>
      <div class="three__parent">
        <div class="ad__items__three">
          <div
            v-for="(item, index) in goodList"
            :key="item.title"
            class="ad__items__three__items"
          >
            <div class="ad__items__three__items__img">
              <img
                class="ad__items__three__items__img__goods"
                :src="item.iconUrl"
                :alt="item.title"
              />
              <div class="ad__items__three__items__img__icons">
                <div class="desc">
                  <!-- 用券立减 -->
                  <img :src="item.discount" alt="" />
                  <div class="text">{{ item.text }}</div>
                </div>
              </div>
              <div class="bgColor"></div>
            </div>

            <div class="ad__items__three__items__title">{{ item.title }}</div>
            <div class="ad__items__three__items__container">
              <div class="price">{{ item.price }}</div>
              <div class="pre">{{ item.pre }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ad__items__four">
        <div class="ad__items__four__go">
          <img src="../../../public/imgs/ad立即前往.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";

// AD
.ad {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.12rem;
  padding: 0.12rem 0.12rem 0;

  &__items {
    display: flex;
    flex-direction: column;
    // align-items: center;
    width: 100%;
    background-image: url("../../../imgs/红色大背景.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    // 新人专享
    &__one {
      height: 0.32rem;
      margin-bottom: 0.05rem;
      padding: 0.12rem 0.08rem 0;
      display: flex;
      overflow: hidden;

      img {
        width: 1.29rem;
        height: 0.32rem;
      }

      // 调整布局 直接在倒计时元素外面套了个盒子
      #outer {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
      }

      &__countDown {
        height: 0.22rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        background-image: linear-gradient(
          to right,
          rgb(255, 255, 255, 0),
          rgba(255, 100, 110)
        );
        border-radius: 0.2rem;
        &__desc {
          padding: 0 0.05rem;
          @include ellipse;
        }
      }
    }

    &__two {
      display: flex;
      justify-content: center;
      padding: 0.08rem 0.03rem;
      &__coupons {
        width: 98.2%;
      }
    }

    .three__parent {
      display: flex;
      justify-content: center;
      margin-bottom: 0.1rem;
    }

    // AD中的商品
    &__three {
      width: 96%;
      height: 50vw;
      background-color: #ffffff;
      border-radius: 0.1rem;
      display: flex;
      overflow: scroll;

      &__items {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        justify-content: space-around;
        width: 31%;

        // 商品图片
        &__img {
          position: relative;
          &__icons {
            position: absolute;
            top: 0.06rem;
            left: 0.1rem;
          }
          &__goods {
            width: 100%;
          }

          // 半透明蒙层
          .bgColor {
            position: absolute;
            top: 0;
            margin: 0.05rem;
            width: 95%;
            height: 100%;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.02);
            border-radius: 0.1rem;
            // 点击时穿透图层
            pointer-events: none;
          }

          .desc,
          .text {
            position: absolute;
            top: 0;
            left: 0.1rem;
            width: 0.28rem;
            color: #ffffff;
            text-align: center;
            line-height: 0.15rem;
            height: 0.32rem;

            img {
              width: 100%;
            }

            .text {
              position: absolute;
              left: 0;
            }
          }
        }

        // 商品名称 和价格

        &__title {
          margin-top: 0.05rem;
          padding-left: 0.12rem;
          min-width: 0.36rem;
          height: 0.32rem;
          flex-shrink: 0;
          white-space: pre-line;
          overflow: hidden;
          text-overflow: ellipsis;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &__container {
          padding-left: 0.1rem;
          .price {
            font-size: 0.16rem;
            color: #ff3f4c;
            margin-top: 0.02rem;
            margin-bottom: -0.02rem;
          }
          .pre {
            text-decoration: line-through;
            color: gray;
            font-size: 0.14rem;
            margin-left: 0.01rem;
          }
        }
      }
    }

    // 隐藏滚动条
    @include scrollbar;

    &__four {
      &__go {
        width: 100%;
        height: 0.49rem;
        display: flex;
        justify-content: center;
        align-items: center;

        // 缩放动画
        @keyframes zoom {
          0% {
            transform: scale(0.8, 0.8);
          }

          50% {
            transform: scale(0.95, 0.95);
          }

          100% {
            transform: scale(0.8, 0.8);
          }
        }

        img {
          width: 1.29rem;
          height: 0.36rem;
          animation: zoom 0.82s infinite;
        }
      }
    }
  }
}
</style>
