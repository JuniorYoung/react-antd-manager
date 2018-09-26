import React from 'react'
import { Menu } from 'antd'
import menuList from '../../config/menuList'
import { NavLink } from 'react-router-dom'
import './index.less'

const SubMenu = Menu.SubMenu

export default class NavLeft extends React.Component {
    state = {
        menuTreeNode: null
    }

    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuList);

        this.setState({
            menuTreeNode: menuTreeNode
        });
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
                <Menu.Item  key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme="dark">
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}