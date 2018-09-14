export default {
    /**
     * 根据时间戳格式化日期 
     * @param {number} timestamp default to current 
     */
    formateDate(timestamp = +new Date) {
        let date = new Date(timestamp)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
}