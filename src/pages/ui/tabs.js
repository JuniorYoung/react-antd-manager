import React from 'react'
import { Card, Tabs, message, Radio, Icon } from 'antd'
import './ui.less'

const TabPane = Tabs.TabPane

export default class MyTabs extends React.Component {

    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false }
        ]
        this.state = {
            mode: 'top',
            panes,
            activeKey: panes[0].key
        }
    }

    handleCallback = (key) => {
        message.info(key)
    }

    handleModeChange = (e) => {
        this.setState({
            mode: e.target.value
        })
    }

    handleEditTabChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }

    handleEdit = (targetKey, action) => {
        message.info(`targetKey: ${targetKey}     action: ${action}`)
        this[action](targetKey)
    }

    /**
     * 添加Tab
     */
    add = () => {
        const panes = this.state.panes
        const activeKey = `newTab${this.newTabIndex++}`
        panes.push({
            title: activeKey,
            content: `Content of ${activeKey}`,
            key: activeKey
        })
        this.setState({
            panes,
            activeKey
        })
    }

    /**
     * 移除Tab
     */
    remove = (targetKey) => {
        const oldPanes = this.state.panes
        let activeKey = this.state.activeKey
        let lastIndex;
        const panes = oldPanes.filter((pane, i) => {
            if(pane.key === targetKey) {
                lastIndex = i - 1
            }
            return pane.key !== targetKey
        })
        if(activeKey === targetKey) {
            activeKey = lastIndex >= 0 ? panes[lastIndex].key : panes[0].key
        }
        this.setState({
            panes,
            activeKey
        })
    }

    render() {
        const { mode } = this.state
        return (
            <div>
                <Card title="基本用法" className="card-wrap">
                    <Radio.Group
                        onChange={this.handleModeChange}
                        value={mode}
                        style={{marginBottom: 8}}
                    >
                        <Radio.Button value="top">top</Radio.Button>
                        <Radio.Button value="left">left</Radio.Button>
                        <Radio.Button value="bottom">bottom</Radio.Button>
                        <Radio.Button value="right">right</Radio.Button>
                    </Radio.Group>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition={mode}
                        style={{ height: 220 }}
                        onChange={this.handleCallback}
                    >
                        <TabPane tab={<span><Icon type="chrome" />Tab 1</span>} key="1">带图标的页签</TabPane>
                        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                        <TabPane tab="Tab 4" key="4">Content of Tab Pane 4</TabPane>
                        <TabPane tab="Tab 5" key="5" disabled>Content of Tab Pane 5</TabPane>
                        <TabPane tab="Tab 6" key="6">Content of Tab Pane 6</TabPane>
                        <TabPane tab="Tab 7" key="7">Content of Tab Pane 7</TabPane>
                        <TabPane tab="Tab 8" key="8">Content of Tab Pane 8</TabPane>
                        <TabPane tab="Tab 9" key="9">Content of Tab Pane 9</TabPane> 
                    </Tabs>
                </Card>
                <Card title="可增加或关闭的卡片式页签" className="card-wrap">
                    <Tabs
                        onChange={this.handleEditTabChange}
                        onEdit={this.handleEdit}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                    >
                        {this.state.panes.map(pane => <TabPane key={pane.key} tab={pane.title} closable={pane.closable}>{pane.content}</TabPane>)}
                    </Tabs>
                </Card>
            </div>
        )
    }
}
