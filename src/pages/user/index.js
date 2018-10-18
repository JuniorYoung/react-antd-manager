import React from 'react'
import { Button, Card, Form, Modal, Input, Radio, Select, DatePicker, message } from 'antd'
import Axios from './../../axios'
import Utils from './../../utils'
import moment from 'moment'
import BaseTable from './../../components/BaseTable'
import BaseForm from './../../components/BaseForm'

const FormItem = Form.Item
const Option = Select.Option

class UserForm extends React.Component {
    getSexText = (sex) => {
        return sex ? (sex === '0' ? '女' : '男') : false
    }
    getStatusText = (status) => {
        return status ? this.props.statusList[status] : false
    }
    getInterestText = (interest) => {
        return interest ? this.props.interestList[interest] : false
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { statusList, interestList, userInfo = {}, handleType } = this.props
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            }
        }
        const detailInfo = handleType === 'detail' ? userInfo : {}
        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formItemLayout}>
                    {detailInfo.username || getFieldDecorator('username', {
                        initialValue: userInfo.username || '',
                        rules: [
                            { required: true, message: '请输入姓名' }
                        ]
                    })(
                        <Input placeholder="请输入姓名" style={{ width: 150 }} />
                    )}
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {this.getSexText(detailInfo.sex) || getFieldDecorator('sex', {
                        initialValue: userInfo.sex || '1'
                    })(
                        <Radio.Group>
                            <Radio value="1">男</Radio>
                            <Radio value="0">女</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem label="当前状态" {...formItemLayout}>
                    {this.getStatusText(detailInfo.status) || getFieldDecorator('status', {
                        initialValue: userInfo.status || ''
                    })(
                        <Select style={{ width: 200 }}>
                            <Option value="">请选择当前状态</Option>
                            {Object.entries(statusList).map(status => (
                                <Option key={status[0]} value={status[0]}>{status[1]}</Option>
                            ))}    
                        </Select>
                    )}
                </FormItem>
                <FormItem label="爱好" {...formItemLayout}>
                    {this.getInterestText(detailInfo.interest) || getFieldDecorator('interest', {
                        initialValue: userInfo.interest || []
                    })(
                        <Select mode="multiple" placeholder="请选择爱好">
                            {Object.entries(interestList).map(interest => (
                                <Option key={interest[0]} value={interest[0]}>{interest[1]}</Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {detailInfo.birthday || getFieldDecorator('birthday', {
                        initialValue: userInfo.birthday ? moment(userInfo.birthday, 'YYYY-MM-DD') : null
                    })(
                        <DatePicker placeholder="出生日期" />
                    )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {detailInfo.addr || getFieldDecorator('addr', {
                        initialValue: userInfo.addr || ''
                    })(
                        <Input.TextArea placeholder="联系地址" autosize={{ minRows: 3, maxRows: 5 }} />
                    )}
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create()(UserForm)

export default class user extends React.Component {

    state = {
        visible: false,
        dataSource: [],
        pagination: null,
        selectedRowKeys: [],
        selectedRow: null,
        handleType: '',
        title: ''
    }
    params = {
        page: 1
    }
    userForm = null
    formList = [{
        type: 'INPUT',
        label: '姓名',
        fieldName: 'username',
        width: 130,
        placeholder: '',
        initialValue: ''
    }, {
        type: 'SELECT',
        label: '性别',
        fieldName: 'sex',
        placeholder: '全部',
        width: 80,
        initialValue: '',
        optionList: [
            { value: '', text: '全部' },
            { value: '0', text: '女' },
            { value: '1', text: '男' }
        ]
    }]

    statusList = {
        "1": '百度FEr',
        "2": '阿里国际UED',
        "3": '创业者',
        "4": '搬砖',
        "5": '浪子',
        "6": '清华才子'
    }

    interestList = {
        "1": '游泳',
        "2": '打篮球',
        "3": '踢足球',
        "4": '跑步',
        "5": '爬山',
        "6": '骑行',
        "7": '桌球',
        "8": '麦霸'
    }

    handleTypeTitle = {
        'delete': '删除员工',
        'create': '创建员工',
        'edit': '编辑员工',
        'detail': '员工详情'
    }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        const self = this
        Axios.ajax({
            url: '/users',
            isShowLoading: true,
            params: this.params
        }).then(resp => {
            this.setState({
                dataSource: resp.list,
                pagination: Utils.pagination(resp.page, resp.pageSize, resp.total, (current) => {
                    self.params.page = current
                    self.requestList()
                }),
                selectedRowKeys: [],
                selectedRow: null
            })
        })
    }
    /**
     * 查询条件搜索
     */
    handleFilterSearch = (fieldsValue) => {
        Object.assign(this.params, fieldsValue)
        this.requestList()
    }
    /**
     * 检查是否已选择行记录
     */
    checkRecord = () => {
        if (this.state.selectedRowKeys.length === 0) {
            Modal.warn({
                title: '提示',
                content: '请选择一条员工记录'
            })
            return false
        }
        return true
    }
    /**
     * 统一的按钮点击事件
     */
    handleOperate = (handleType) => {
        if (handleType === 'create' || this.checkRecord()) {
            if (handleType === 'delete') {
                //删除
                Modal.confirm({
                    title: '提示',
                    content: '确认删除所选员工？',
                    onOk: () => {
                        return Axios.ajax({
                            url: `/user/${this.state.selectedRow.id}`,
                            method: 'delete'
                        }).then(resp => {
                            message.success('删除成功')
                            this.requestList()
                        }).catch(() => {
                            
                        })
                    }
                })
                return
            }
            this.setState({
                visible: true,
                handleType,
                title: this.handleTypeTitle[handleType]
            })
        }
    }
    /**
     * 员工的创建/更新表单提交事件
     */
    handleUserFormSubmit = () => {
        const { handleType, selectedRow }= this.state
        let url = ''
        let method = ''
        let msg = ''
        if (handleType === 'create') {
            url = '/user'
            method = 'post'
            msg = '创建成功'
        } else if (handleType === 'edit') {
            url = `/user/${selectedRow.id}`
            method = 'patch'
            msg = '更新成功'
        }
        this.userForm.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                //将出生日期格式化
                let _birth = fieldsValue['birthday']
                if (_birth) {
                    fieldsValue['birthday'] = _birth.format('YYYY-MM-DD')
                }
                Axios.ajax({
                    url,
                    method,
                    data: fieldsValue
                }).then(resp => {
                    this.userForm.props.form.resetFields()
                    this.setState({
                        visible: false
                    })
                    message.success(msg)
                    this.requestList()
                })
            }
        })
    }
    /**
     * 关闭模态框
     */
    handleCloseModal = () => {
        this.userForm.props.form.resetFields()
        this.setState({ visible: false })
    }
    render() {
        const self = this
        const columns = [{
            title: '用户名',
            dataIndex: 'username'
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex === 0 ? '女' : '男'
            }
        }, {
            title: '状态',
            dataIndex: 'status',
            render(status) {
                return self.statusList[status]
            }
        }, {
            title: '年龄',
            dataIndex: 'age'
        }, {
            title: '爱好',
            dataIndex: 'interest',
            render(interest) {
                return self.interestList[interest]
            }
        }, {
            title: '是否已婚',
            dataIndex: 'ismarried',
            render(ismarried) {
                return ismarried === 0 ? '否' : '是'
            }
        }, {
            title: '出生日期',
            dataIndex: 'birthday'
        }, {
            title: '联系地址',
            dataIndex: 'addr'
        }]
        const { handleType } = this.state
        return (
            <div>
                <Card className="card-wrap">
                    <BaseForm
                        formList={this.formList}
                        handleFilterSearch={this.handleFilterSearch}
                    />
                </Card>
                <Card className="toolbar-wrap">
                    <Button type="primary" onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type="danger" onClick={() => this.handleOperate('delete')}>删除员工</Button>
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
                    title={this.state.title}
                    visible={this.state.visible}
                    width={700}
                    onCancel={this.handleCloseModal}
                    footer={handleType === 'detail' ? null : <div>
                        <Button onClick={this.handleCloseModal}>关闭</Button>
                        <Button type="primary" onClick={this.handleUserFormSubmit}>确定</Button>
                    </div>}
                >
                    <UserForm
                        userInfo={handleType !== 'create' ? this.state.selectedRow : undefined}
                        handleType={handleType}
                        wrappedComponentRef={form => this.userForm = form}
                        statusList={this.statusList}
                        interestList={this.interestList} />
                </Modal>
            </div>
        )
    }
}