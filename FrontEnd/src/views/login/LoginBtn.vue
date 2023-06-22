<script setup>
import { post } from "../../utils/request"
import { useRouter } from "vue-router"
import { toast } from "../../utils/toast"
import jwt_decode from "jwt-decode" // 解码token
import { useAuthStore } from "../../stores/counter"

const authStore = useAuthStore()

const props = defineProps(["items"])
const data = props.items

const router = useRouter()

// 登录按钮
async function login() {
  // 登录按钮颜色发生改变 说明输入框不为空, 同时也勾选了 用户协议
  if (data.btnColor) {
    // try {
    //     const result = await post('/user/login', {
    //         // 发送给后端的数据
    //         name: data.userName,
    //         password: data.passWord
    //     })

    //     // 封装时已经把 data放进 resolve了
    //     if (result?.errno === 0) {
    //         localStorage.isLogin = true  // 暂时随便写一下 注意 这里是string类型
    //         router.push("/")  // 跳转路由
    //     } else {
    //         alert("登录失败")
    //     }
    // } catch (e) {
    //     alert("请求失败")
    // }

    try {
      const result = await post("/login", {
        account: data.account,
        password: data.passWord,
      })

      if (result?.status === "ok" && result?.data) {
        // 把token保存起来
        const token = result.data
        localStorage.setItem("token", token)

        // 解码token
        const decode = jwt_decode(token)

        // 存储到pinia中
        authStore.setAuth(!!decode) // 用户登录状态 decode是一个对象 !!decode -> true
        authStore.setUser(decode) // 用户信息
        router.push("/")
      } else {
        toast("账号或密码错误")
      }
    } catch (error) {
      toast("服务器错误")
    }
  } else if (!data.account || !data.passWord) {
    toast("请先输入账号或密码")
  } else {
    toast("请先勾选用户协议")
  }
}
</script>

<template>
  <!-- 登录按钮 -->
  <div @click="login" class="button" :class="{ agreed__button: data.btnColor }">
    登 录
  </div>

  <!-- 切换登录方式 -->
  <div class="change--login">
    <span>短信验证码登录</span>
    <span>手机快速注册</span>
  </div>
</template>

<style lang="scss" scoped>
// 登录按钮
.button {
  margin-top: 0.3rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.16rem;
  color: #fff;
  background-color: #ffbeb4;
}

.agreed__button {
  background-color: #ff2b06;
}

.change--login {
  height: 0.192rem;
  margin-top: 0.2rem;
  font-size: 0.14rem;
  color: #999999;
  display: flex;
  justify-content: space-between;
}
</style>
