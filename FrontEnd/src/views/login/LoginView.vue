<script setup>
import { ref, reactive, watch, computed } from "vue"
import Toast from "../../components/Toast.vue"
import { toast } from "../../utils/toast"
import Header from "./Header.vue"
import Input from "./Input.vue"
import LoginBtn from "./LoginBtn.vue"
import QuickLogin from "./QuickLogin.vue"
import Protocol from "./Protocol.vue"

const data = reactive({
  showIcon1: false,
  showIcon2: false,
  account: "",
  passWord: "",
  eye: false,
  display: "password",
  isChecked: false,
  btnColor: false,
})

// checked框
watch(data, () => {
  // 同时满足input框内容不为空 和 CheckBox为true
  if (data.isChecked && data.account && data.passWord) {
    data.btnColor = true
  } else {
    data.btnColor = false
  }
})
</script>

<template>
  <div class="wrapper">
    <Header></Header>
    <Input :items="data" />
    <LoginBtn :items="data"></LoginBtn>
    <Toast></Toast>
    <QuickLogin></QuickLogin>
    <Protocol :items="data"></Protocol>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 0.25rem 0.25rem;
  background-color: #fff;
}
</style>
