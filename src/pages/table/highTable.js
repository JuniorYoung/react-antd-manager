import React from 'react'
import { Card, Table, Badge, Modal, message, Button } from 'antd'
import Axios from '../../axios'

export default class HighTable extends React.Component {
    state = {
        dataSource: [],
        sortOrder: 'descend'
    }

    componentDidMount() {
        this.requestTableData()
    }

    requestTableData = () => {
        Axios.ajax({
            url: '/table/list',
            isShowLoading: true
        }).then(resp => {
            const data = resp.data
            data.map((item, index) => {
                item.key = index
            })
            this.setState({
                dataSource: data
            })
        })
    }

    handleTableChange = (pagination, filters, sorter, extra) => {
        this.setState({
            sortOrder: sorter.order
        })
    }

    handleDelete = (e, item) => {
        const self = this
        e.preventDefault()
        const id = item.id
        Modal.confirm({
            title: '确定',
            content: `确认删除此条数据吗？ ${id}`,
            onOk() {
                //调用后台接口完成删除操作
                message.success('删除成功')
                self.requestTableData()
            }
        })
    }

    render() {
        const self = this
        const columns1 = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 70
        }, {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
            width: 80
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            width: 70,
            render(sex) {
                return sex === 0 ? '女' : '男'
            }
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 120
        },{
            title: '爱好',
            dataIndex: 'interest',
            key: 'interest',
            width: 90,
            render(interest) {
                const interests = {
                    '1': '踢足球',
                    '2': '打篮球',
                    '3': '打网球',
                    '4': '打羽毛球',
                    '5': '打棒球',
                    '6': '打台球',
                    '7': '麦霸',
                    '8': '下棋'
                }
                return interests[interest]
            }
        }, {
            title: '是否已婚',
            dataIndex: 'ismarried',
            key: 'ismarried',
            width: 70,
            render(ismarried) {
                return ismarried === 0 ? '否' : '是'
            }
        }, {
            title: '住址',
            dataIndex: 'addr',
            key: 'addr',
            width: 120
        }]

        const columns2 = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 70,
            fixed: 'left'
        }, {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
            width: 80,
            fixed: 'left'
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            width: 70,
            render(sex) {
                return sex === 0 ? '女' : '男'
            }
        }, {
            title: '爱好',
            dataIndex: 'interest',
            key: 'interest',
            width: 90,
            render(interest) {
                const interests = {
                    '1': '踢足球',
                    '2': '打篮球',
                    '3': '打网球',
                    '4': '打羽毛球',
                    '5': '打棒球',
                    '6': '打台球',
                    '7': '麦霸',
                    '8': '下棋'
                }
                return interests[interest]
            }
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday1',
            width: 120
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday2',
            width: 120
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday3',
            width: 120
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday4',
            width: 120
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday5',
            width: 120
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday6',
            width: 120
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday7',
            width: 120
        }, {
            title: '是否已婚',
            dataIndex: 'ismarried',
            key: 'ismarried',
            width: 70,
            render(ismarried) {
                return ismarried === 0 ? '否' : '是'
            }
        }, {
            title: '住址',
            dataIndex: 'addr',
            key: 'addr',
            width: 120,
            fixed: 'right'
        }]

        const columns3 = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 70
        }, {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
            width: 80
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            width: 70,
            render(sex) {
                return sex === 0 ? '女' : '男'
            }
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 70,
            sorter: (a, b) => {
                return a.age - b.age
            },
            sortOrder: this.state.sortOrder
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 120
        },{
            title: '爱好',
            dataIndex: 'interest',
            key: 'interest',
            width: 90,
            render(interest) {
                const interests = {
                    '1': '踢足球',
                    '2': '打篮球',
                    '3': '打网球',
                    '4': '打羽毛球',
                    '5': '打棒球',
                    '6': '打台球',
                    '7': '麦霸',
                    '8': '下棋'
                }
                return interests[interest]
            }
        }, {
            title: '是否已婚',
            dataIndex: 'ismarried',
            key: 'ismarried',
            width: 70,
            render(ismarried) {
                return ismarried === 0 ? '否' : '是'
            }
        }, {
            title: '住址',
            dataIndex: 'addr',
            key: 'addr',
            width: 120
        }]

        const columns4 = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render(sex) {
                return sex === 0 ? '女' : '男'
            }
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday',
        },{
            title: '爱好',
            dataIndex: 'interest',
            key: 'interest',
            render(interest) {
                const interests = {
                    '1': <Badge status="success" text='踢足球' />,
                    '2': <Badge status="processing" text='打篮球' />,
                    '3': <Badge status="default" text='打网球' />,
                    '4': <Badge status="error" text='打羽毛球' />,
                    '5': <Badge status="warning" text='打棒球' />,
                    '6': <Badge status="processing" text='打台球' />,
                    '7': <Badge status="default" text='麦霸' />,
                    '8': <Badge status="error" text='下棋' />
                }
                return interests[interest]
            }
        }, {
            title: '是否已婚',
            dataIndex: 'ismarried',
            key: 'ismarried',
            render(ismarried) {
                return ismarried === 0 ? '否' : '是'
            }
        }, {
            title: '住址',
            dataIndex: 'addr',
            key: 'addr'
        }, {
            title: '操作',
            render(text, item) {
                return <a href='#' onClick={(e) => self.handleDelete(e, item)}>删除</a>
            }
        }]

        return (
            <div>
                <Card title="头部固定" className="card-wrap">
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns1}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="左右侧固定" className="card-wrap">
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns2}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: 1300 }}
                    />
                </Card>
                <Card title="排序" className="card-wrap">
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns3}
                        pagination={{ pageSize: 5 }}
                        onChange={this.handleTableChange}
                    />
                </Card>
                <Card title="嵌套操作按钮">
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns4}
                    />
                </Card>
            </div>
        )
    }
}