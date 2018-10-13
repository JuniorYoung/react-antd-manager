import React from 'react'
import {
    Button,
    Form,
    Table,
    Card,
    Select,
    Modal,
    Radio,
    message
} from 'antd'
import Axios from './../../axios'
import Utils from './../../utils'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class FilterForm extends React.Component {
    /**
     * 重置查询条件
     */
    handleReset = () => {
        this.props.form.resetFields()
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
                        </Select>  
                    )}
                </FormItem>
                <FormItem label="用车模式">
                    {getFieldDecorator('mode', {
                        initialValue: ''
                    })(
                        <Select placeholder="全部" style={{ width: 130 }}>
                            <Option value="">全部</Option>
                            <Option value="1">指定停车点模式</Option>
                            <Option value="2">禁停区模式</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="营运模式">
                    {getFieldDecorator('op_mode', {
                        initialValue: ''
                    })(
                        <Select placeholder="全部" style={{ width: 100 }}>
                            <Option value="">全部</Option>
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {getFieldDecorator('auth_status', {
                        initialValue: ''
                    })(
                        <Select placeholder="全部" style={{ width: 100 }}>
                            <Option value="">全部</Option>
                            <Option value="1">已授权</Option>
                            <Option value="2">未授权</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" type="primary" onClick={this.props.handleSearch}>查询</Button>
                    <Button htmlType="reset" onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create()(FilterForm)

class OpenCityForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {getFieldDecorator('city_id', {
                        initialValue: '',
                        rules: [{
                            required: true,
                            message: '请选择开通城市'
                        }]
                    })(
                        <Select style={{ width: 120 }}>
                            <Option value="">请选择开通城市</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">天津市</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {getFieldDecorator('op_mode',{
                        initialValue: '1'
                    })(
                        <RadioGroup>
                            <Radio value="1">自营</Radio>
                            <Radio value="2">加盟</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {getFieldDecorator('mode',{
                        initialValue: '1'
                    })(
                        <RadioGroup>
                            <Radio value="1">指定停车点模式</Radio>
                            <Radio value="2">禁停区模式</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm = Form.create()(OpenCityForm)

export default class City extends React.Component {

    state = {
        dataSource: [],
        pagination: null,
        visible: false
    }

    params = {
        page: 1
    }

    filterForm = null
    openCityForm = null

    handleOpenCity = () => {
        this.setState({
            visible: true
        })
    }

    /**
     * 提交开通城市表单
     */
    handleOpenCitySubmit = () => {
        const f = this.openCityForm.props.form
        //校验
        f.validateFieldsAndScroll((errors, values) => {
            if (!errors) {
                Axios.ajax({
                    method: 'post',
                    url: '/opencity/save',
                    data: values
                }).then(resp => {
                    this.setState({
                        visible: false
                    })
                    message.success('开通成功')
                    this.requestList()
                })
            }
        })
    }

    /**
     * 多条件查询
     */
    handleSearch = (e) => {
        e.preventDefault()
        const formVals = this.filterForm.props.form.getFieldsValue()
        this.params = Object.assign({}, this.params, formVals)
        this.requestList()
    }

    requestList = () => {
        const self = this
        Axios.ajax({
            isShowLoading: true,
            url: '/opencity/list',
            params: this.params
        }).then(resp => {
            const data = resp.list
            this.setState({
                dataSource: data,
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

    render() {
        const columns = [{
            title: '城市ID',
            dataIndex: 'id'
        }, {
            title: '城市名称',
            dataIndex: 'name'
        }, {
            title: '用车模式',
            dataIndex: 'mode',
            render(mode) {
                return mode === 1 ? '停车点' : '禁停区'
            }
        }, {
            title: '营运模式',
            dataIndex: 'op_mode',
            render(op_mode) {
                return op_mode === 1 ? '自营' : '加盟'
            }
        }, {
            title: '授权加盟商',
            dataIndex: 'franchise_name'
        }, {
            title: '城市管理员',
            dataIndex: 'city_admins',
            render(arr) {
                return arr.map(item => item.user_name).join(',')
            }
        }, {
            title: '城市开通时间',
            dataIndex: 'open_date'
        }, {
            title: '操作时间',
            dataIndex: 'update_time'
        }, {
            title: '操作人',
            dataIndex: 'sys_action_user'
        }]
        return (
            <div>
                <Card className="card-wrap">
                    <FilterForm handleSearch={this.handleSearch} wrappedComponentRef={form => this.filterForm = form} />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card> 
                <div className="content-wrap">
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        columns={columns}
                        rowKey="id"
                    />
                </div>
                <Modal
                    visible={this.state.visible}
                    title="开通城市"
                    onCancel={() => this.setState({
                        visible: false
                    })}
                    onOk={this.handleOpenCitySubmit}
                >
                    <OpenCityForm wrappedComponentRef={form => this.openCityForm = form} />
                </Modal>
            </div>
        )
    }
}