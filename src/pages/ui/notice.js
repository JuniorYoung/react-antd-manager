import React from 'react'
import { Card, Button, notification, Select } from 'antd'
import './ui.less'

const Option = Select.Option
const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']

export default class Notice extends React.Component {

    handleOpen = (type) => {
        notification[type]({
            message: '您摊上事儿啦',
            description: '您上个月应到21天，实到10天，旷工11天，已被开除，请知悉！'
        })
    }

    render() {
        return (
            <div>
                <Card title="基本用法" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleOpen('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleOpen('error')}>Error</Button>
                    <Button type="primary" onClick={() => this.handleOpen('warning')}>Warning</Button>
                </Card>
                <Card title="设置位置" className="card-wrap">
                    <Select
                        defaultValue="topRight"
                        style={{width: 150, marginRight: 10}}
                        onChange={val => {
                            notification.config({
                                placement: val
                            })
                        }}
                    >
                        {options.map(val => <Option key={val} value={val}>{val}</Option>)}
                    </Select>
                    <Button type="primary" onClick={() => this.handleOpen('warn')}>Open the notification box</Button>
                </Card>
            </div>
        )
    }
}