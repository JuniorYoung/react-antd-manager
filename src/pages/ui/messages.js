import React from 'react'
import { Card, Button, message, Icon } from 'antd'
import './ui.less'

export default class Messages extends React.Component {
    handleOpen = (type) => {
        message[type](`This is a prompt message for ${type}`)
    }
    handleLoading = () => {
        message.loading('Action in progress...')
            .then(() => message.success('loading finished 1'))
            .then(() => message.info('loading finished2'))
    }
    handleOpenByConfig = () => {
        message.open({
            content: 'This is a prompt message for open',
            duration: 2.5, // default 3
            icon: <Icon type="chrome" spin />
        })
    }
    render() {
        return (
            <div>
                <Card title="全局Message" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleOpen('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleOpen('error')}>Error</Button>
                    <Button type="primary" onClick={() => this.handleOpen('warning')}>Warning</Button>
                    <Button type="primary" onClick={this.handleOpenByConfig}>Open</Button>
                    <Button type="primary" onClick={this.handleLoading}>Loading</Button>
                </Card>
            </div>
        )
    }
}