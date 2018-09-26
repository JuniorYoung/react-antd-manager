import React from 'react'
import {
    Card,
    Button,
    Radio,
    Modal
} from 'antd'
import './ui.less'

export default class Modals extends React.Component {
    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }

    handleOpenBasicModal = (type) => {
        this.setState({
            [type]: true
        })
    }

    handleOpenConfirm = (type) => {
        Modal[type]({
            cancelText: '自定义取消按钮的文字',
            content: '提示信息的主内容。比如，周报写了吗？',
            okText: '自定义确认按钮的文字',
            title: '信息提示框'
        })
    }

    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpenBasicModal('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleOpenBasicModal('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpenBasicModal('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleOpenBasicModal('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpenConfirm('info')}>info</Button>
                    <Button type="primary" onClick={() => this.handleOpenConfirm('success')}>success</Button>
                    <Button type="primary" onClick={() => this.handleOpenConfirm('error')}>error</Button>
                    <Button type="primary" onClick={() => this.handleOpenConfirm('warning')}>warning</Button>
                    <Button type="primary" onClick={() => this.handleOpenConfirm('confirm')}>confirm</Button>
                </Card>
                <Modal
                    title="React"
                    visible={this.state.showModal1}
                    onCancel={() => this.setState({showModal1: false})}
                >
                    <p>欢迎学习慕课新推出的React高级课程</p>
                </Modal>
                <Modal
                    title="自定义页脚"
                    okText="确定的自定义说明文字"
                    cancelText="取消的自定义说明文字"
                    visible={this.state.showModal2}
                    onCancel={() => this.setState({showModal2: false})}
                >
                    <p>欢迎学习慕课新推出的React高级课程</p>
                </Modal>
                <Modal
                    title="顶部20px弹框"
                    style={{top:20}}
                    visible={this.state.showModal3}
                    onCancel={() => this.setState({showModal3: false})}
                >
                    <p>欢迎学习慕课新推出的React高级课程</p>
                </Modal>
                <Modal
                    title="水平垂直居中"
                    visible={this.state.showModal4}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({showModal4: false})}
                >
                    <p>欢迎学习慕课新推出的React高级课程</p>
                </Modal>
            </div>
        )
    }
}