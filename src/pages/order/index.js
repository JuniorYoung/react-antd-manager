import React from 'react'
import {
    Button,
    Form,
    Table,
    Card,
    Select,
    Modal,
    DatePicker,
    message
} from 'antd'
import Axios from './../../axios'
import Utils from './../../utils'

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker

class FilterForm extends React.Component {
    /**
     * 重置查询条件
     */
    handleReset = () => {
        this.props.form.resetFields()
    }

    orderStatus = {
        '1': '进行中',
        '2': '进行中（临时锁车）',
        '3': '行程结束',
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="inline" onSubmit={this.props.handleSearch}>
                <FormItem label="城市">
                    {getFieldDecorator('city_id', {
                        initialValue: ''
                    })(
                        <Select placeholder="全部" style={{ width: 100 }}>
                            <Option value="">全部</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">天津市</Option>
                            <Option value="3">深圳市</Option>
                            <Option value="4">杭州市</Option>
                        </Select>  
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('start_end_time')(
                        <RangePicker
                            showTime
                            format="YYYY-MM-DD HH:mm"
                            placeholder={['开始时间', '结束时间']}
                        />
                    )}
                </FormItem>
                <FormItem label="订单状态">
                    {getFieldDecorator('order_status', {
                        initialValue: ''
                    })(
                        <Select placeholder="全部" style={{ width: 140 }}>
                            <Option value="">全部</Option>
                            {Object.keys(this.orderStatus).map(key => <Option key={key} value={key}>{this.orderStatus[key]}</Option>)}
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.props.handleSearch}>查询</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create()(FilterForm)

export default class Order extends React.Component {

    state = {
        dataSource: [],
        pagination: null,
        visible: false,
        selectedRowKeys: [],
        selectedItem: null,
        orderInfo: {}
    }

    params = {
        page: 1
    }

    filterForm = null

    /**
     * 多条件查询
     */
    handleSearch = (e) => {
        e.preventDefault()
        const f = this.filterForm.props.form
        f.validateFields((err, fieldsValue) => {
            if (err) return
            const timeObj = fieldsValue['start_end_time']
            const flag = timeObj && timeObj.length > 0
            if (flag) fieldsValue['start_end_time'] = null
            
            Object.assign(this.params, {
                ...fieldsValue,
                start_time: flag ? timeObj[0].format('YYYY-MM-DD HH:mm') : '',
                end_time: flag ? timeObj[1].format('YYYY-MM-DD HH:mm') : '',
            })
            this.requestList() 
        })
    }

    requestList = () => {
        const self = this
        Axios.ajax({
            isShowLoading: true,
            url: '/order/list',
            params: this.params
        }).then(resp => {
            const data = resp.list
            this.setState({
                dataSource: data,
                selectedItem: null,
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
    }

    checkOrder = () => {
        const record = this.state.selectedItem
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
            const { id } = this.state.selectedItem
            //跳转到订单详情页面
            window.open(`/#/common/order/detail/${id}`, '_blank')
        }
    }

    /**
     * 结束订单
     */
    handleEndOrder = () => {
        if(this.checkOrder()) {
            const { order_sn } = this.state.selectedItem
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
        const { order_sn } = this.state.selectedItem
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

    handleRowClick = (record) => {
        this.setState({
            selectedRowKeys: [record.id],
            selectedItem: record
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
                    return self.filterForm.orderStatus[status]
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
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.handleRowClick(selectedRows[0])
            }
        }
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
                    <FilterForm handleSearch={this.handleSearch} wrappedComponentRef={form => this.filterForm = form} />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleOrderDetail}>订单详情</Button>
                    <Button onClick={this.handleEndOrder} style={{ marginLeft: 10 }}>结束订单</Button>
                </Card> 
                <div className="content-wrap">
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        columns={columns}
                        rowSelection={rowSelection}
                        rowKey="id"
                        onRow={(record, index) => ({
                            onClick: () => {
                                this.handleRowClick(record)
                            }
                        })}
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