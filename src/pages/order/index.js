import React from 'react'
import {
    Button,
    Form,
    Card,
    Modal,
    message
} from 'antd'
import BaseForm from './../../components/BaseForm'
import BaseTable from './../../components/BaseTable'
import Axios from './../../axios'
import Utils from './../../utils'

const FormItem = Form.Item

export default class Order extends React.Component {

    state = {
        dataSource: [],
        pagination: null,
        visible: false,
        selectedRowKeys: [],
        selectedRow: null,
        orderInfo: {}
    }

    params = {
        page: 1
    }

    orderStatusMap = new Map()

    filterFormList = []

    /**
     * 条件查询
     */
    handleFilterSearch = (fieldsValue) => {
        const timeObj = fieldsValue['start_end_time']
        const flag = timeObj && timeObj.length > 0
        if (flag) fieldsValue['start_end_time'] = null
        Object.assign(this.params, {
            ...fieldsValue,
            start_time: flag ? timeObj[0].format('YYYY-MM-DD HH:mm') : '',
            end_time: flag ? timeObj[1].format('YYYY-MM-DD HH:mm') : ''
        })
        this.requestList() 
    }

    requestList = () => {
        const self = this
        Axios.ajax({
            isShowLoading: true,
            url: '/order/list',
            params: this.params
        }).then(resp => {
            const data = resp.list
            data.forEach((item, i) => item.key = i)
            this.setState({
                dataSource: data,
                selectedRow: null,
                selectedRowKeys: [],
                pagination: Utils.pagination(resp.page, resp.pageSize, resp.total, (current) => {
                    self.params.page = current
                    self.requestList()
                })
            })
        })
    }

    componentDidMount() {
        this.requestList()
        const orderStatus = [
            { value: 1, text: '进行中' },
            { value: 2, text: '进行中（临时锁车）' },
            { value: 3, text: '行程结束' }
        ]
        orderStatus.forEach(os => {
            this.orderStatusMap.set(os.value, os)
        })
        this.filterFormList = [{
            type: 'SELECT',
            label: '城市',
            fieldName: 'city_id',
            width: 100,
            placeholder: '全部',
            initialValue: '',
            optionList: [
                { value: '', text: '全部' },
                { value: '1', text: '北京市' },
                { value: '2', text: '天津市' },
                { value: '3', text: '深圳市' }
            ]
        }, {
            type: 'RANGEPICKER',
            label: '订单时间',
            initialValue: [],
            fieldName: 'start_end_time',
            placeholder: ['开始时间', '结束时间'],
        }, {
            type: 'SELECT',
            label: '订单状态',
            fieldName: 'order_status',
            width: 140,
            placeholder: '全部',
            initialValue: '',
            optionList: [{ value: '', text: '全部' }, ...this.orderStatusMap.values()]
        }]
    }

    checkOrder = () => {
        const record = this.state.selectedRow
        if (!record) {
            Modal.info({
                title: '提示',
                content: '请先选择一条订单'
            })
            return false
        }
        return true
    }

    /**
     * 订单详情
     */
    handleOrderDetail = () => {
        if(this.checkOrder()) {
            const { id } = this.state.selectedRow
            //跳转到订单详情页面
            window.open(`./#/common/order/detail/${id}`, '_blank')
        }
    }

    /**
     * 结束订单
     */
    handleEndOrder = () => {
        if(this.checkOrder()) {
            const { order_sn } = this.state.selectedRow
            //根据订单编号查询订单详情
            Axios.ajax({
                url: '/order/end',
                params: { order_sn }
            }).then(resp => {
                this.setState({
                    orderInfo: resp,
                    visible: true
                })
            })
        }
    }

    handleEndOrderSubmit = (e) => {
        e.preventDefault()
        //根据订单编号结束订单
        const { order_sn } = this.state.selectedRow
        Axios.ajax({
            method: 'post',
            url: '/order/update',
            data: { order_sn }
        }).then(resp => {
            message.success('成功结束订单')
            this.setState({
                visible: false,
                orderInfo: {}
            })
            this.requestList()
        })
    }

    render() {
        const self = this
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km'
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(status) {
                    return self.orderStatusMap.get(status).text
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const { orderInfo } = this.state
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <div>
                <Card className="card-wrap">
                    <BaseForm handleFilterSearch={this.handleFilterSearch} formList={this.filterFormList} />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleOrderDetail}>订单详情</Button>
                    <Button onClick={this.handleEndOrder} style={{ marginLeft: 10 }}>结束订单</Button>
                </Card> 
                <div className="content-wrap">
                    <BaseTable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        rowKey="id"
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectionType="radio"
                        updateSelectedItem={Utils.updateSelectedItem.bind(this, 'radio')}
                    />
                </div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onCancel={() => this.setState({
                        visible: false
                    })}
                    onOk={this.handleEndOrderSubmit}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}