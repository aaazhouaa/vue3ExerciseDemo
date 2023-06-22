<script setup>
const props = defineProps(["items"])
const data = props.items

//TODO 不延迟就无法清空内容, 先放着
// 失去焦点后
function focusOut1() {
  setTimeout(() => {
    data.showIcon1 = false
  }, 200)
}

function focusOut2() {
  setTimeout(() => {
    data.showIcon2 = false
  }, 200)
}

// 清空内容
function clear1() {
  data.account = ""
}

function clear2() {
  data.passWord = ""
}

// 显示或隐藏密码
function changeDisplay() {
  if (data.eye) {
    data.eye = false
    data.display = "password"
  } else {
    data.eye = true
    data.display = "text"
  }
}
</script>

<template>
  <div class="input">
    <!-- 账号 -->
    <div class="account">
      <!-- @focus: 聚焦时显示icon @blur: 失去焦点时隐藏icon -->
      <input
        @focus="data.showIcon1 = true"
        @blur="focusOut1"
        v-model="data.account"
        type="text"
        placeholder="账号名/邮箱/手机号"
      />
      <i
        v-if="data.showIcon1"
        @click="clear1"
        class="icon-clear icon-clear1"
      ></i>
    </div>

    <!-- 密码 -->
    <div class="password">
      <input
        @focus="data.showIcon2 = true"
        @blur="focusOut2"
        v-model="data.passWord"
        :type="data.display"
        placeholder="请输入密码"
        autocomplete="new-password"
      />
      <i v-show="data.showIcon2" @click="clear2" class="icon-clear"></i>
      <span
        @click="changeDisplay"
        class="eye"
        :class="{ off_pwd: data.eye === true }"
      ></span>
      <span class="forgot">忘记密码</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 修改浏览器自动填充时 input框的背景颜色
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 100px white inset;
  box-shadow: 0 0 0px 100px white inset;
}

.input {
  height: 1.2rem;

  .account,
  .password {
    position: relative;
    height: 0.5rem;
    margin-top: 0.2rem;
    padding: 0.1rem 0;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #f6f6f6;

    input {
      width: 100%;
      height: 0.29rem;
      outline: none;
      border: none;
      font-size: 0.16rem;
    }

    .icon-clear {
      position: absolute;
      right: 1.6rem;
      margin-top: 0.02rem;
      width: 0.24rem;
      height: 100%;
      background-image: url("../../../imgs/login/x.png");
      background-size: 100% auto;
      background-repeat: no-repeat;
    }

    .icon-clear1 {
      right: 0.05rem;
    }

    .eye {
      position: absolute;
      right: 1.3rem;
      margin-top: 0.03rem;
      width: 0.24rem;
      height: 0.24rem;
      background-image: url("../../../imgs/login/close_eye.png");
      background-size: 100% auto;
    }

    .off_pwd {
      background-image: url("../../../imgs/login/eye.png");
    }

    .forgot {
      position: absolute;
      right: 0;
      margin-top: 0.02rem;
      box-sizing: border-box;
      width: 1.008rem;
      height: 0.23rem;
      font-size: 0.14rem;
      line-height: 0.23rem;
      text-align: center;
      border-left: 0.01rem solid #d3d3d3;
    }
  }

  .password {
    padding-right: 1.8rem;
    box-sizing: border-box;
  }
}
</style>
