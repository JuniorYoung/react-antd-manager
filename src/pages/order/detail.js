import React from 'react'
import { Card } from 'antd'
import Axios from './../../axios'
import './detail.less'

export default class OrderDetail extends React.Component {
    state = {
        orderInfo: null
    }

    map = null

    componentDidMount() {
        const orderId = this.props.match.params.orderId
        if (orderId) {
            this.requestOrderInfo(orderId)
        }
    }

    requestOrderInfo = (orderId) => {
        Axios.ajax({
            url: '/order/detail',
            params: { order_id: orderId }
        }).then(resp => {
            this.setState({
                orderInfo: resp
            })
            this.renderMap()
        })
    }

    /**
     * 渲染地图
     */
    renderMap = () => {
        const orderInfo = this.state.orderInfo
        //初始化地图
        this.map = new window.BMap.Map('orderDetailMap')
        const _loc = orderInfo.bike_gps.split(',')
        this.map.centerAndZoom(new window.BMap.Point(_loc[0], _loc[1]), 11)
        this.addMapControl()
        this.drawBikeRoute(orderInfo.position_list || [])
        this.drawServiceArea(orderInfo.area || [])
    }

    /**
     * 添加地图控件
     */
    addMapControl = () => {
        this.map.addControl(new window.BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }))
        this.map.addControl(new window.BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }))
    }

    /**
     * 绘制行程路线图
     */
    drawBikeRoute = (positionList) => {
        if (positionList.length > 0) {
            const BMap = window.BMap
            //设置开始与结束的位置
            const startLoca = positionList[0]
            const startPoint = new BMap.Point(startLoca.lon, startLoca.lat)
            const startIcon = new BMap.Icon('/assets/start_point.png', new BMap.Size(36, 42), {
                imageSize:new window.BMap.Size(36,42)
            })
            this.map.addOverlay(new BMap.Marker(startPoint, {
                icon: startIcon
            }))

            const endLoca = positionList[positionList.length - 1]
            const endIcon = new BMap.Icon('/assets/end_point.png', new BMap.Size(36, 42), {
                imageSize:new window.BMap.Size(36,42)
            })            
            const endPoint = new BMap.Point(endLoca.lon, endLoca.lat)
            this.map.addOverlay(new BMap.Marker(endPoint, {
                icon: endIcon
            }))
            
            this.map.addOverlay(new BMap.Polyline(positionList.map(position => new BMap.Point(position.lon, position.lat)), {
                strokeColor: '#1869AD',
                strokeWeight: 3
            }))
            this.map.centerAndZoom(endPoint, 11)
        }
    }

    /**
     * 绘制服务区域
     */
    drawServiceArea = (area) => {
        if (area.length > 0) {
            const BMap = window.BMap
            this.map.addOverlay(new BMap.Polygon(area.map(point => new BMap.Point(point.lon, point.lat)), {
                strokeColor: '#CE0000',
                strokeWeight: 2,
                strokeOpacity: 1,
                fillColor: '#ff8605',
                fillOpacity: 0.4
            }))
        }
    }

    render() {
        const orderInfo = this.state.orderInfo || {}
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{orderInfo.mode === 1 ?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{orderInfo.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{orderInfo.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{orderInfo.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{orderInfo.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{orderInfo.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{orderInfo.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{orderInfo.distance / 1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}