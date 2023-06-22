import { reactive } from "vue"

export const data = reactive({
    showToast: false,
    toastText: ""
})
export function toast(message) {

    if (!data.showToast) {
        data.showToast = true
        data.toastText = message

        setTimeout(() => {
            data.showToast = false
            data.toastText = ""
        }, 1500)
    }

}
