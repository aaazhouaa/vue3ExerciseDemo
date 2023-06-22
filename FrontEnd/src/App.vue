<script setup>
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import Docker from "./components/Docker.vue"

const router = useRouter()
const route = useRoute()
const isShow = ref(true)

router.beforeEach((to, from) => {
  // if (
  //   to.name === "login" ||
  //   to.name === "shop" ||
  //   to.name === "search" ||
  //   to.name === "info" ||
  //   to.name === "pay"
  // )
  if (
    [
      "login",
      "shop",
      "search",
      "info",
      "pay",
      "createAddress",
      "editAddress",
    ].includes(to.name)
  ) {
    isShow.value = false
  } else {
    isShow.value = true
  }
})
</script>
<template>
  <div v-show="isShow">
    <Docker></Docker>
  </div>

  <RouterView></RouterView>
</template>

<style scoped></style>
