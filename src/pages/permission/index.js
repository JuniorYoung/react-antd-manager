import React from 'react'
import { Card, Button, Modal, Form, Input, Radio, message, Tree, Transfer } from 'antd'
import BaseTable from './../../components/BaseTable'
import menus from './../../config/menuList'
import Axios from './../../axios'
import Utils from './../../utils'

const FormItem = Form.Item
const TreeNode = Tree.TreeNode

/**
 * 创建角色表单
 */
class CreateRoleForm extends React.Component {
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
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator('roleName', {
                        rules: [
                            { required: true, message: '请输入角色名称' }
                        ]
                    })(
                        <Input placeholder="请输入角色名称" />
                    )}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {getFieldDecorator('status', {
                        initialValue: 1
                    })(
                        <Radio.Group>
                            <Radio value={1}>开启</Radio>
                            <Radio value={0}>关闭</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
            </Form>
        )
    }
}
CreateRoleForm = Form.create()(CreateRoleForm)

/**
 * 角色权限设置表单
 */
class RolePermitForm extends React.Component {
    renderTreeNodes = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode {...item} />
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { roleInfo } = this.props
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <Form>
                <FormItem label="角色名称" {...formItemLayout}>
                    {roleInfo.role_name}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {getFieldDecorator('status', {
                        initialValue: roleInfo.status
                    })(
                        <Radio.Group>
                            <Radio value={1}>启用</Radio>
                            <Radio value={0}>停用</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem label="权限" {...formItemLayout}>
                    <Tree
                        checkable
                        defaultExpandAll
                        checkedKeys={this.props.menus}
                        onCheck={this.props.updateMenus}
                    >
                        {this.renderTreeNodes(menus)}
                    </Tree>
                </FormItem>
            </Form>
        )
    }
}
RolePermitForm = Form.create()(RolePermitForm)

/**
 * 用户授权表单
 */
class AuthUserForm extends React.Component {
    render() {
        const roleInfo = this.props.roleInfo
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
                <FormItem label="角色名称" {...formItemLayout}>
                    {roleInfo.role_name}
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        dataSource={this.props.userDataSource}
                        targetKeys={this.props.userTargetKeys}
                        titles={['所有用户', '已选用户']}
                        showSearch
                        listStyle={{ height: 300 }}
                        onChange={this.props.updateUsers}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}

export default class Permission extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            selectedRow: null,
            createVisible: false,
            rolePermitVisible: false,
            authVisible: false,
            menus: [],
            userDataSource: [],
            userTargetKeys: []
        }
        this.createRoleForm = null
        this.rolePermitForm = null
        this.authUserForm = null

    }
    componentDidMount() {
        this.request()
    }
    request = () => {
        Axios.ajax({
            isShowLoading: true,
            url: '/permission/roles'
        }).then(resp => {
            const data = resp.list
            this.setState({
                dataSource: data,
                selectedRow: null,
                selectedRowKeys: []
            })
        })
    }

    handleCreateRole = () => {
        this.setState({
            createVisible: true
        })
    }
    handleCreateRoleClose = () => {
        this.createRoleForm.props.form.resetFields()
        this.setState({
            createVisible: false
        })
    }
    handleCreateRoleSubmit = () => {
        const f = this.createRoleForm.props.form
        f.validateFields((err, fieldsValue) => {
            if (!err) {
                Axios.ajax({
                    method: 'post',
                    url: '/permission/role',
                    data: fieldsValue
                }).then(resp => {
                    message.success('创建成功')
                    this.handleCreateRoleClose()
                    this.request()
                })
            }
        })
    }

    checkRecord = () => {
        if (!this.state.selectedRow) {
            Modal.info({
                title: '提示',
                content: '请先选择一条数据'
            })
            return false
        }
        return true
    }

    handleRolePermit = () => {
        if(this.checkRecord()) {
            const record = this.state.selectedRow
            this.setState({
                rolePermitVisible: true,
                menus: record.menus
            })
        }
    }
    handleRolePermitClose = () => {
        this.setState({
            rolePermitVisible: false,
            menus: []
        })
    }
    handleRolePermitSubmit = () => {
        const vals = this.rolePermitForm.props.form.getFieldsValue()
        vals.menus = this.state.menus
        Axios.ajax({
            method: 'patch',
            url: `/permission/role/${this.state.selectedRow.id}`,
            data: vals
        }).then(resp => {
            message.success('设置成功')
            this.handleRolePermitClose()
            this.request()
        })
    }

    handleAuthUser = () => {
        if (this.checkRecord()) {
            this.setState({
                authVisible: true
            })
            const record = this.state.selectedRow
            Axios.ajax({
                url: '/permission/users',
                params: {
                    id: record.id
                }
            }).then(resp => {
                const _tk = []
                const _ds = resp.map(item => {
                    if (item.status === 1) {
                        _tk.push(item.user_id)
                    }
                    return {
                        title: item.user_name,
                        key: item.user_id,
                        status: item.status
                    }
                })
                this.setState({
                    userDataSource: _ds,
                    userTargetKeys: _tk
                })
            })
        }
    }
    handleAuthUserClose = () => {
        this.setState({
            authVisible: false,
            userDataSource: [],
            userTargetKeys: []
        })
    }
    handleAuthUserSubmit = () => {
        Axios.ajax({
            method: 'patch',
            url: `/permission/userauth/${this.state.selectedRow.id}`,
            data: {
                users: this.state.userTargetKeys
            }
        }).then(resp => {
            message.success('授权成功')
            this.handleAuthUserClose()
        })
    }

    render() {
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render(create_time) {
                    return Utils.formateDate(create_time)
                }
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    return status === 0 ? '停用' : '启用'
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render(authorize_time) {
                    return Utils.formateDate(authorize_time)
                }
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleCreateRole}>创建角色</Button>
                    <Button onClick={this.handleRolePermit} style={{ margin: '0 10px'}}>角色权限</Button>
                    <Button onClick={this.handleAuthUser}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <BaseTable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        rowKey="id"
                        pagination={false}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectionType="radio"
                        updateSelectedItem={Utils.updateSelectedItem.bind(this, 'radio')}
                    />
                </div>
                <Modal
                    title='创建角色'
                    visible={this.state.createVisible}
                    onCancel={this.handleCreateRoleClose}
                    onOk={this.handleCreateRoleSubmit}
                >
                    <CreateRoleForm wrappedComponentRef={form => this.createRoleForm = form} />
                </Modal>
                <Modal
                    title="角色权限"
                    visible={this.state.rolePermitVisible}
                    onCancel={this.handleRolePermitClose}
                    onOk={this.handleRolePermitSubmit}
                >
                    <RolePermitForm
                        roleInfo={this.state.selectedRow}
                        menus={this.state.menus}
                        updateMenus={checkedKeys => this.setState({
                            menus: checkedKeys
                        })}
                        wrappedComponentRef={form => this.rolePermitForm = form}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.authVisible}
                    onCancel={this.handleAuthUserClose}
                    width={650}
                    onOk={this.handleAuthUserSubmit}
                >
                    <AuthUserForm
                        wrappedComponentRef={form => this.authUserForm = form}
                        userDataSource={this.state.userDataSource}
                        userTargetKeys={this.state.userTargetKeys}
                        updateUsers={tks => this.setState({
                            userTargetKeys: tks
                        })}
                        roleInfo={this.state.selectedRow}
                    />
                </Modal>
            </div>
        )
    }
}