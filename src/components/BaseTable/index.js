import React from 'react'
import { Table } from 'antd'
import './index.less'

export default class BaseTable extends React.Component {

    handleRowSelectionChange = (selectedRowKeys, selectedRows) => {
        const item = this.props.selectionType === 'radio' ? selectedRows[0] : selectedRows
        this.props.updateSelectedItem(selectedRowKeys, item)
    }

    handleRowSelectionSelect = (record, selected, selectedRows, nativeEvent) => {

    }

    handleRowSelectionSelectAll = (selected, selectedRows, changeRows) => {

    }

    handleRowClick = (record, index) => {
        const { rowKey } = this.props
        const v = rowKey ? record[rowKey] : index
        let selectedRowKeys = [v]
        if (this.props.selectionType === 'checkbox') {  
            const set = new Set(this.props.selectedRowKeys)
            if (set.has(v)) {
                set.delete(v)
            } else {
                set.add(v)
            }
            selectedRowKeys = [...set]
        }
        this.props.updateSelectedItem(selectedRowKeys, record)
    }

    initTable = () => {
        const { 
            columns, dataSource, pagination, rowKey,
            selectedRowKeys, selectionType 
        } = this.props

        const rowSelection = selectionType ? {
            type: selectionType,
            selectedRowKeys,
            onChange: this.handleRowSelectionChange,
            onSelect: this.handleRowSelectionSelect,
            onSelectAll: this.handleRowSelectionSelectAll
        } : null
        return (
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                rowKey={rowKey}
                rowSelection={rowSelection}
                onRow={(record, index) => ({
                    onClick: () => {
                        if (!rowSelection) return
                        this.handleRowClick(record, index)
                    }
                })}
            />
        )
    }

    render() {
        return this.initTable()
    }
}