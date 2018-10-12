import React from 'react'
import { Card, Table } from 'antd'
import Axios from '../../axios'
import Utils from '../../utils'

export default class BasicTable extends React.Component {
    state = {
        dataSource: [],
        dataSource1: [],
        selectedRowKeys: [],
        selectedRowCheckKeys: [],
        selectedItem: null,
        pagination: null
    }

    params = {
        page: 1,
        pageSize: 5
    }

    componentDidMount() {
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }]
        this.setState({ dataSource })
        this.requestTableData()
    }

    requestTableData = () => {
        Axios.ajax({
            url: '/table/list',
            params: this.params,
            isShowLoading: true
        }).then(resp => {
            const data = resp.data
            data.map((item, index) => {
                item.key = index
            })
            this.setState({
                dataSource1: data,
                selectedRowCheckKeys: [],
                pagination: Utils.pagination(resp.page, resp.pageSize, resp.total, (current) => {
                    this.params.page = current
                    this.requestTableData()
                })
            })
        })
    }

    getRowCheckKeys = (index) => {
        const keys = this.state.selectedRowCheckKeys
        const set = new Set(keys)
        if (set.has(index)) {
            set.delete(index)
        } else {
            set.add(index)
        }
        return [...set]
    }

    onRowClick = (record, index) => {
        console.log(record)
        this.setState({
            selectedRowKeys: [index],
            selectedItem: record
        })
    }

    onRowCheckClick = (record, index) => {
        console.log(record, index)
        this.setState({
            selectedRowCheckKeys: this.getRowCheckKeys(index)
        })
    }

    onRowChange = (selectedRowKeys, selectedItem) => {
        console.log(selectedRowKeys, selectedItem)
        this.setState({
            selectedRowKeys,
            selectedItem
        })
    }

    onRowCheckChange = (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows)
        this.setState({
            selectedRowCheckKeys: selectedRowKeys
        })
    }

    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }]

        const columns1 = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '姓名',
            dataIndex: 'username',
            key: 'username'
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render(sex) {
                return sex === 0 ? '女' : '男'
            }
        }, {
            title: '爱好',
            dataIndex: 'interest',
            key: 'interest',
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
            render(ismarried) {
                return ismarried === 0 ? '否' : '是'
            }
        }, {
            title: '住址',
            dataIndex: 'addr',
            key: 'addr'
        }]

        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.onRowChange(selectedRowKeys, selectedRows)
            }
        }

        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys: this.state.selectedRowCheckKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.onRowCheckChange(selectedRowKeys, selectedRows)
            }
        }

        return (
            <div>
                <Card title="基础表格" className="card-wrap">
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
                <Card title="使用Mock数据渲染的表格" className="card-wrap">
                    <Table
                        bordered
                        dataSource={this.state.dataSource1}
                        columns={columns1}
                        pagination={false}
                    />
                </Card>
                <Card title="使用Mock数据渲染的表格-单选" className="card-wrap">
                    <Table
                        bordered
                        dataSource={this.state.dataSource1}
                        columns={columns1}
                        pagination={false}
                        rowSelection={rowSelection}
                        onRow={(record, index) => ({
                            onClick: () => {
                                this.onRowClick(record, index)
                            }
                        })}
                    />
                </Card>
                <Card title="使用Mock数据渲染的表格-多选" className="card-wrap">
                    <Table
                        bordered
                        dataSource={this.state.dataSource1}
                        columns={columns1}
                        pagination={false}
                        rowSelection={rowCheckSelection}
                        onRow={(record, index) => ({
                            onClick: () => {
                                this.onRowCheckClick(record, index)
                            }
                        })}
                    />
                </Card>
                <Card title="使用Mock数据渲染的表格-分页">
                    <Table
                        bordered
                        dataSource={this.state.dataSource1}
                        columns={columns1}
                        pagination={this.state.pagination}
                        rowSelection={rowCheckSelection}
                        onRow={(record, index) => ({
                            onClick: () => {
                                this.onRowCheckClick(record, index)
                            }
                        })}
                    />
                </Card>
            </div>
        )
    }
}