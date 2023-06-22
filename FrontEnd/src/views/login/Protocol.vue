<script setup>
const props = defineProps(["items"])
const data = props.items

</script>

<template>
    <div class="agree">
        <input type="checkbox" name="" id="" v-model="data.isChecked">
        <span>登录即代表您已同意 </span>
        <a href="">用户隐私政策</a>
    </div>
</template>

<style lang='scss' scoped>
.agree {
    height: 0.168rem;
    margin-top: .15rem;
    font-size: .13rem;
    text-align: center;

    input {
        margin-right: .04rem;
    }

    span {
        color: rgba(0, 0, 0, .3);
    }

    a {
        color: #4a90e2;
    }
}
</style>