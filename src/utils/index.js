export default {
    /**
     * 根据时间戳格式化日期 
     * @param {Number} timestamp default to current 
     */
    formateDate(timestamp = +new Date) {
        let date = new Date(timestamp)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    /**
     * 公共分页配置
     * @param {Number} current 当前页码
     * @param {Number} pageSize 每页条数
     * @param {Number} total 总条数
     * @param {Function} callback 回调函数
     */
    pagination(current, pageSize, total, callback) {
        return {
            current: current,
            pageSize: pageSize,
            showQuickJumper: true,
            showTotal: (total, range) => {
                return `共${total}条`
            },
            total: total,
            onChange: (page, pageSize) => {
                callback(page)
            }
        }
    },
    /**
     * 表格列表，更新所选中的行
     * @param {String} type 'radio' / 'checkbox'
     * @param {Array} selectedRowKeys 所选中行的key
     * @param {Array || Object} selectedRows  所选中的行
     */
    updateSelectedItem(type, selectedRowKeys, selectedRows) {
        const selected = type === 'radio' ? 'selectedRow' : 'selectedRows'
        this.setState({
            selectedRowKeys,
            [selected]: selectedRows
        })
    }
}