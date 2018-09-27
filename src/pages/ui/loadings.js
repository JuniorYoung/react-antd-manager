import React from 'react'
import {
    Card,
    Spin,
    Alert,
    Icon,
    Switch
} from 'antd'
import './ui.less'

export default class Loadings extends React.Component {
    state = {
        loading: false
    }

    toggle = (value) => {
        this.setState({
            loading: value
        })
    }

    render() {
        const indicator = <Icon type="chrome" spin />
        return (
            <div>
                <Card title="基本用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{margin: '0 10px'}} />
                    <Spin size="large" />
                    <Spin size="large" indicator={indicator} style={{marginLeft: 10}} />
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Spin spinning={this.state.loading} tip="加载中">
                        <Alert
                            type="info"
                            message="Alert message title"
                            description="Further details about the context of this alert."
                        />
                    </Spin>
                    <div style={{marginTop: 10}}>
                        Loading state: <Switch checked={this.state.loading} onChange={this.toggle} />
                    </div>
                </Card>
            </div>
        )
    }
}