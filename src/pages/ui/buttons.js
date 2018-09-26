import React from 'react'
import {
    Card,
    Button,
    Radio
} from 'antd'
import './ui.less'

const ButtonGroup = Button.Group
const RadioGroup = Radio.Group

export default class Buttons extends React.Component {
    state = {
        loading: false,
        size: 'default'
    }

    handleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    handleChangeSize = (e) => {
        this.setState({
            size: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Click me</Button>
                    <Button>Click me</Button>
                    <Button type="dashed">Click me</Button>
                    <Button type="danger">Click me</Button>
                    <Button disabled>Click me</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon="plus">add</Button>
                    <Button icon="edit">edit</Button>
                    <Button icon="delete">delete</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">search</Button>
                    <Button type="primary" icon="download">download</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>loading</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button onClick={this.handleLoading}>{this.state.loading ? '关闭' : '点击加载'}</Button>
                </Card>
                <Card title="按钮组" style={{marginBottom: 10}}>
                    <ButtonGroup>
                        <Button type="primary" icon="left">Left</Button>
                        <Button type="primary" icon="right">Right</Button>
                    </ButtonGroup>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <RadioGroup value={this.state.size} onChange={this.handleChangeSize}>
                        <Radio value="small">small</Radio>
                        <Radio value="default">default</Radio>
                        <Radio value="large">large</Radio>
                    </RadioGroup>
                    <Button type="primary" size={this.state.size}>Click me</Button>
                    <Button size={this.state.size}>Click me</Button>
                    <Button type="dashed" size={this.state.size}>Click me</Button>
                    <Button type="danger" size={this.state.size}>Click me</Button>
                    <Button disabled size={this.state.size}>Click me</Button>
                </Card>
            </div>
        )
    }
}