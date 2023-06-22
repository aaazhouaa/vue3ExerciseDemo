<script setup>
import SortTop from "./SortTop.vue"
import SortIcons from "./SortIcons.vue"
import AD from "../AD.vue"
</script>

<template>
  <div
    style="background-image: url('../../../../../imgs/sort/超市.jpg')"
    class="sort"
  >
    <SortTop></SortTop>
    <SortIcons></SortIcons>
    <AD></AD>
  </div>
</template>

<style lang="scss" scoped>
.sort {
  background-position: top;
  background-size: 100% 1.5rem;
  background-repeat: no-repeat;
  background-color: #fff;
  margin-bottom: 0.6rem;
}
</style>
