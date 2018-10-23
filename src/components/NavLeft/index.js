import React from 'react'
import { Menu } from 'antd'
import menuList from '../../config/menuList'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'

import './index.less'

const SubMenu = Menu.SubMenu

class NavLeft extends React.Component {
    state = {
        menuTreeNode: null,
        selectedKeys: ''
    }

    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuList);

        this.setState({
            menuTreeNode: menuTreeNode
        });
    }

    handleLinkUpdate = (key, title) => {
        if (key === this.state.selectedKeys) {
            return false
        }
        this.props.dispatch(switchMenu(title))
        this.setState({
            selectedKeys: key
        })
    }

    /**
     * 渲染菜单
     */
    renderMenu = (menus) => {
        return menus.map( item => {
            if(item.children) {
                // 使用递归
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }

    render() {
        const _k = this.state.selectedKeys || window.location.hash.replace(/#|(\?.*)/g, '')
        return (
            <div>
                <NavLink to="/home" onClick={() => {
                    this.handleLinkUpdate('/home', '首页')
                }}>
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt=""/>
                        <h1>Imooc MS</h1>
                    </div>
                </NavLink>
                <Menu
                    selectedKeys={[_k]}
                    theme="dark"
                    onClick={({ item, key }) => {
                        this.handleLinkUpdate(key, item.props.title)
                    }}
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}

export default connect()(NavLeft)