<script setup>
import { computed, ref } from "@vue/reactivity"
import { useRouter } from "vue-router"
import MyTransition from "../../components/MyTransition.vue"
import { useAuthStore } from "../../stores/counter"

const store = useAuthStore()
const router = useRouter()

// 隐藏手机号
function hidePhoneNumber(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
}

// 改变选中地址 当切换收货地址时 只允许当前地址被勾选
function changeChecked(id) {
  const item = store.userAddress.find((item) => item.id === id)
  for (let address of store.userAddress) {
    address.checked = false
  }
  item.checked = true
  console.log(item)
}

// 控制整个组件的显隐
const props = defineProps(["display"])
const display = computed(() => props.display)

const emit = defineEmits(["hidden"])
</script>

<template>
  <Teleport to="body">
    <MyTransition #back>
      <div v-if="display" @click="emit('hidden')" class="background"></div
    ></MyTransition>
    <MyTransition #front>
      <div v-if="display" class="wrapper">
        <div class="title">
          选择收货地址<span @click="emit('hidden')" class="close-icon iconfont"
            >&#xe6d5;</span
          >
        </div>
        <!-- 切换地址 -->
        <div v-for="item in store.userAddress" class="items">
          <div
            @click="changeChecked(item.id)"
            class="checked"
            :class="{ unchecked: !item.checked }"
          ></div>
          <div class="info">
            <div class="phone">
              <span>{{ item.owner }} </span>
              <!-- 加密手机号 -->
              <span> {{ hidePhoneNumber(item.phoneNumber) }}</span>
            </div>
            <div class="address">{{ item.address }}{{ item.doorNumber }}</div>
          </div>
          <!-- 编辑地址 -->
          <div
            @click="router.push(`/editAddress/${item.id}`)"
            class="editor-icon iconfont"
          >
            &#xe620;
          </div>
        </div>
        <div @click="router.push('/createAddress')" class="btn">
          新建收货地址
        </div>
      </div>
    </MyTransition>
  </Teleport>
</template>
<style lang="scss" scoped>
@import "../../style/mixins.scss";
.background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
}
.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80vh;
  color: #333;
  border-top-left-radius: 0.12rem;
  border-top-right-radius: 0.12rem;
  background-color: #fff;
  .title {
    position: relative;
    font-size: 0.16rem;
    font-weight: bold;
    text-align: center;
    padding: 0.15rem 0;
    .close-icon {
      position: absolute;
      font-weight: 300;
      font-size: 0.2rem;
      right: 0.1rem;
      color: #999;
    }
  }

  // 电话等信息
  .items {
    display: flex;
    align-items: center;
    margin-left: 0.1rem;
    padding: 0.15rem 0.1rem 0.15rem 0;
    border-bottom: 0.01rem solid #e9e9e9;
    .checked {
      width: 0.5rem;
      height: 0.5rem;
      background-image: url("../../../public/imgs/shop/勾选.png");
      background-position: left 0.1rem;
      background-repeat: no-repeat;
      background-size: 0.22rem;
    }
    .unchecked {
      background-image: url("../../../public/imgs/shop/未勾选.png");
    }
    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      .phone {
        display: flex;
        gap: 0.06rem;
        font-size: 0.16rem;
        color: #666;
      }
      .address {
        font-size: 0.14rem;
        @include ellipse;
      }
    }
    .editor-icon {
      width: 0.44rem;
      height: 0.44rem;
      font-size: 0.2rem;
      text-align: end;
      line-height: 0.44rem;
      color: #999;
    }
  }
  .btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.4rem;
    margin: 0 0.1rem;
    font-size: 0.16rem;
    font-weight: bold;
    color: #fff;
    border-radius: 0.2rem;
    background-color: #0bd13f;
  }
}
</style>
