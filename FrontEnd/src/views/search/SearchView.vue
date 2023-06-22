<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const history = ref({})
</script>

<template>
  <div class="top">
    <div @click="router.back(1)" class="icon iconfont">&#xe62f;</div>
    <div class="search">
      <div class="search__icon iconfont">&#xe632;</div>
      <input autofocus class="input" type="text" />
    </div>
    <div class="btn">搜索</div>
  </div>
  <div class="panel">
    <div class="history">
      <div class="desc">搜索历史</div>
      <div class="clear">清除搜索历史</div>
    </div>
    <div class="content">
      <div class="ago">哈哈</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.44rem;
  font-size: 0.14rem;
  .icon {
    margin-left: 0.1rem;
    width: 0.3rem;
  }
  .search {
    position: relative;
    flex: 1;
    &__icon {
      position: absolute;
      top: 0.06rem;
      left: 0.1rem;
      color: #999999;
    }
    .input {
      width: 100%;
      height: 0.3rem;
      padding-left: 0.3rem;
      box-sizing: border-box;
      border: none;
      border-radius: 0.15rem;
      outline: none;
    }
  }
  .btn {
    margin: 0 0.12rem 0 0.1rem;
  }
}
.panel {
  position: absolute;
  top: 0.44rem;
  bottom: 0;
  padding-top: 0.2rem;
  width: 100%;
  border-radius: 0.12rem;
  background-color: #ffffff;

  .history {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.15rem;

    .desc {
      color: #333333;
      font-size: 0.15rem;
      font-weight: bold;
    }
    .clear {
      color: #666666;
    }
  }
  .content {
    height: 0.73rem;
    margin-top: 0.12rem;
    margin-bottom: 0.1rem;
    padding-left: 0.15rem;
    box-sizing: border-box;
    .ago {
      display: inline-block;
      height: 0.26rem;
      line-height: 0.26rem;
      padding: 0 0.12rem;
      margin: 0 0.1rem 0.1rem 0;
      border-radius: 0.12rem;
      background-color: #f4f4f4;
    }
  }
}
</style>
