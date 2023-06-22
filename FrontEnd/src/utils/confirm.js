import { reactive } from "vue";

export const confirmData = reactive({
    show: false,
    title: null,
    tips: null,
    sureText: "确定",
    handleClickSure: null
})


// 接收三个参数 第一个参数是包含了两个值的 数组, 第二个参数是一个回调函数 第三个参数是sureText文本内容  tips, sureText为可选参数
export function confirmFn([title, tips], callback, sureText) {
    // 调用这个函数就弹出对话框弹出
    confirmData.show = true

    confirmData.title = title
    confirmData.tips = tips || null
    confirmData.sureText = sureText || confirmData.sureText
    confirmData.handleClickSure = () => {
        callback()
        confirmData.show = false

    }

} 