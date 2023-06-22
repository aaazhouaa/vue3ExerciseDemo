<script setup>
import { reactive, ref } from "vue"
import { toast } from "../../utils/toast"
import Toast from "../../components/Toast.vue"
import { useAuthStore } from "../../stores/counter"
import { useRouter } from "vue-router"

const store = useAuthStore()
const router = useRouter()
// 默认选中标签未null
const current = ref(null)
const tab = ref(["家", "公司", "学校"])

// 用户填写的信息
const info = reactive({
  address: null,
  doorNumber: null,
  owner: null,
  phoneNumber: null,
  tab: null,
})

function save() {
  if (!info.address || !info.doorNumber || !info.owner || !info.phoneNumber) {
    toast("请先将信息填写完整")
  } else {
    const reg = /^1[3456789]\d{9}$/
    if (reg.test(info.phoneNumber)) {
      store.createAddress(info)
      router.back(1)
    } else {
      toast("请输入正确的手机号码")
    }
  }
}
</script>

<template>
  <Toast></Toast>
  <form action="">
    <div class="create-address">
      <ul class="items">
        <li style="padding: 0.15rem 0.1rem 0.15rem 0; font-size: 0.14rem">
          小区 / 大厦 / 学校 :<input
            ref="info.address"
            v-model="info.address"
            type="text"
            placeholder=""
          />
        </li>
        <li>
          楼号-门牌号 :<input
            ref="info.doorNumber"
            v-model="info.doorNumber"
            type="text"
            placeholder="例如: A座906室"
          />
        </li>
        <li>
          售后人 :<input
            ref="info.owner"
            v-model="info.owner"
            type="text"
            placeholder="请填写收货人姓名"
          />
        </li>
        <li>
          联系电话 :<input
            ref="info.phoneNumber"
            v-model="info.phoneNumber"
            type="text"
            placeholder=""
          />
        </li>
        <li style="font-size: 0.14rem; border-bottom: none">
          标签 :
          <span
            v-for="(item, index) in tab"
            class="label"
            @click=";(current = index), (info.tab = item)"
            :class="{ active: index === current }"
            >{{ item }}</span
          >
        </li>
      </ul>
    </div>
    <div @click="save" class="btn">
      <div class="save">保存</div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.create-address {
  padding: 0.15rem 0.15rem;
  display: flex;
  flex-direction: column;
  color: #333;
  background-color: #fff;
  .items {
    li {
      display: flex;
      white-space: nowrap;
      padding: 0.15rem 0;
      font-size: 0.15rem;
      border-bottom: 0.01rem solid #e9e9e9;
      input {
        width: 100%;
        margin-left: 0.1rem;
        border: none;
        outline: none;
        background-color: transparent;
      }
      //   textarea {
      //     border: none;
      //     resize: none;
      //     height: auto;
      //     width: 100%;
      //     outline: none;
      //   }
      ::placeholder {
        font-size: 0.15rem;
      }
      // 三个标签
      .label {
        margin: 0 0.1rem;
        padding: 0 0.12rem;
        border: 0.01rem solid #e9e9e9;
      }
      // 标签选中时的样式
      .active {
        color: #fff;
        background-color: #5fbc65;
      }
    }
  }
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.3rem 0.15rem 0;
  height: 0.4rem;
  background-color: #47b34f;
  border-radius: 0.2rem;
  .save {
    font-size: 0.16rem;
    font-weight: bold;
    color: #fff;
  }
}
</style>
