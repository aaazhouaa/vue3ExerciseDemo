<script setup>
import { reactive, ref } from "vue"
import { toast } from "../../utils/toast"
import Toast from "../../components/Toast.vue"
import { useAuthStore } from "../../stores/counter"
import { useRoute, useRouter } from "vue-router"
import Confirm from "../../components/Confirm.vue"
import { confirmFn } from "../../utils/confirm"

const store = useAuthStore()
const router = useRouter()
const route = useRoute()

// 当前要修改的地址信息
// item.id 是number类型 route.params.id是string类型
const address = store.userAddress.find((item) => item.id == route.params.id)

// 用户填写的信息
const info = reactive({
  id: address.id,
  checked: address.checked,
  address: address.address,
  doorNumber: address.doorNumber,
  owner: address.owner,
  phoneNumber: address.phoneNumber,
  tab: address.tab,
})

const tab = ref(["家", "公司", "学校"])
// 已保存的 tab 索引值
const index = tab.value.findIndex((item) => item === info.tab)
const current = ref(index)

// 保存
function save() {
  if (!info.address || !info.doorNumber || !info.owner || !info.phoneNumber) {
    toast("请先将信息填写完整")
  } else {
    const reg = /^1[3456789]\d{9}$/
    if (reg.test(info.phoneNumber)) {
      // 找到对应的数据
      const index = store.userAddress.findIndex(
        (item) => item.id == route.params.id
      )
      if (index !== -1) {
        // !==-1 说明找到了
        store.userAddress[index] = info // 把info中的内容赋值给原来的内容
        router.back(1)
      } else {
        console.log("没找到")
      }
    } else {
      toast("请输入正确的手机号码")
    }
  }
}

// 删除
function deleteAddress() {
  confirmFn(["确定要删除吗?"], () => {
    router.back(1)
    // 找到对应的数据
    const index = store.userAddress.findIndex(
      (item) => item.id == route.params.id
    )
    if (index !== -1) {
      // !==-1 说明找到了
      store.userAddress.splice(index, 1) // 删除
      router.back(1)
    }
  })
}
</script>

<template>
  <Confirm></Confirm>
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
    <div class="delete">
      <img
        @click="deleteAddress()"
        src="../../../public/imgs/icon_address_delete.png"
        alt=""
      />
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
// 删除按钮
.delete {
  display: flex;
  justify-content: center;
  margin-top: 0.6rem;
  img {
    width: 0.44rem;
    height: 0.44rem;
  }
}
</style>
