<script setup>
const props = defineProps(["items"])
const iconList = props.items
</script>

<template>
  <div v-for="(items, index) in iconList" class="wrapper">
    <div class="wrapper__sort">{{ items.sort }}</div>
    <div class="wrapper__items">
      <div v-for="(icons, index) in items.icons" class="wrapper__items__icons">
        <div class="wrapper__items__icons__icon">
          <img :src="icons.icon" alt="" />
        </div>
        <div class="wrapper__items__icons__desc">{{ icons.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.wrapper {
  width: 100%;
  margin-top: 0.12rem;
  padding-top: 0.13rem;
  border-radius: 0.12rem;
  background-color: #fff;

  &__sort {
    font-size: 0.16rem;
    font-weight: 700;
    height: 0.2rem;
    color: rgb(51, 51, 51);
    margin-bottom: 0.13rem;
    padding: 0 0.12rem;
    @include ellipse;
  }

  &__items {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.08rem;
    box-sizing: border-box;

    &__icons {
      width: 25%;
      height: 0.66rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0.09rem 0.16rem;
      box-sizing: border-box;

      &__icon {
        width: 0.32rem;
        height: 0.32rem;

        img {
          width: 100%;
        }
      }

      &__desc {
        margin-top: 0.02rem;
        @include ellipse;
      }
    }
  }
}
</style>
