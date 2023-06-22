<script setup>
import { reactive } from "vue"
import IconItem from "../../components/IconItem.vue"

// 使用这个组件需要传入包含 icon,title,text,desc,to的对象
// 不展示绿色按钮 就不要传 desc 这个属性 或赋值为空字符串
const props = defineProps(["item"])
const itemList = props.item
</script>

<template>
  <div class="panel">
    <IconItem :items="itemList"></IconItem>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  height: 100vh;
  margin: 0.1rem;
  background-color: #fff;
  border-radius: 0.12rem;
  overflow: hidden;
}
</style>
