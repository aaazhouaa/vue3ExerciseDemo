import { defineStore } from 'pinia'

// 用户登录信息
export const useAuthStore = defineStore("auth", {
  state: () => ({
    // 用户登录状态
    isAuthenticate: false,
    // 用户信息, 未登录显示默认内容
    user: {
      nickname: "登录 / 注册",
      img: "../../../imgs/mineheadicon.png",
    },
    userAddress: [],
    // 记录地址唯一的 id值
    count: 0
  }),
  getters: {
    getAuth: (state) => state.isAuthenticate,
    getUser: (state) => state.user,
    // 获取收货信息
    getAddress: (state) => {
      let address = {}
      for (let i = 0; i < state.userAddress.length; i++) {
        address = state.userAddress[i]
        if (address.checked) {
          // 有checked为 true的 就返回
          return [address.address, address.doorNumber, address.owner, address.phoneNumber]
        }
      }
      // 上面没有匹配到 就默认最后一个地址为 true (for循环最后一次)
      //TODO
      address.checked = true
      return [address.address, address.doorNumber, address.owner, address.phoneNumber]
    }
  },

  actions: {
    setAuth(isAuth) {
      if (isAuth) {
        this.isAuthenticate = isAuth
      } else { this.isAuthenticate = false }
    },
    setUser(user) {
      if (user) {
        this.user = user
      } else {
        this.user = {
          name: "登录 / 注册",
          img: "../../../imgs/mineheadicon.png",
        }
      }

    },

    // 添加收货信息
    createAddress(info) {
      this.count++

      const newInfo = {
        id: this.count,
        checked: false,
        address: info.address,
        doorNumber: info.doorNumber,
        owner: info.owner,
        phoneNumber: info.phoneNumber,
        tab: info.tab,
      }
      this.userAddress.push(newInfo)
    },

    // deleteAddress(id) {
    //   delete this.userAddress.find((item) => item.id == id)
    //   console.log(this.userAddress)
    // }

  },

  persist: true
})