export function countDown(time, cb) {

    const will = new Date(time).getTime()  // 截止时间

    let timer

    function update() {
        const now = new Date().getTime()  // 当前时间
        let resTime = (will - now) / 1000  // 剩余时间 单位是秒

        // 设置时分秒
        let hour = Math.floor(resTime / (60 * 60)).toString().padStart(2, "0")  // 用toStrong()内置的方法 在前面补一个数
        let minute = Math.floor((resTime % (60 * 60)) / 60).toString().padStart(2, "0")
        let seconds = Math.floor(resTime % 60).toString().padStart(2, "0")

        if (resTime < 0) {
            clearTimeout(timer)
            resTime = 0
        } else {
            timer = setTimeout(update, 1000)
        }
        // 这里调用回调函数 里面的参数就是对应 调用countDown(time,(这里面的参数)=>{})时, 第二个函数中的参数
        cb({ resTime, hour, minute, seconds })  // 这里就是把 剩余时间 时分秒 作为参数传入 
    }

    timer = setTimeout(update, 1)

}