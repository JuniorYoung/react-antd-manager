import React from 'react'
import { Card } from 'antd'
import BaseForm from './../../components/BaseForm'
import Axios from './../../axios'

export default class BikeMap extends React.Component {
    constructor() {
        super()
        this.filterFormList = [{
            type: 'SELECT',
            label: '城市',
            fieldName: 'city_id',
            width: 100,
            placeholder: '全部',
            initialValue: '',
            optionList: [
                { value: '', text: '全部' },
                { value: '1', text: '北京市' },
                { value: '2', text: '天津市' },
                { value: '3', text: '深圳市' }
            ]
        }, {
            type: 'RANGEPICKER',
            label: '订单时间',
            initialValue: [],
            fieldName: 'start_end_time',
            placeholder: ['开始时间', '结束时间'],
        }, {
            type: 'SELECT',
            label: '订单状态',
            fieldName: 'order_status',
            width: 140,
            placeholder: '全部',
            initialValue: '',
            optionList: [
                { value: '', text: '全部' },
                { value: '1', text: '进行中' },
                { value: '2', text: '进行中（临时锁车）' },
                { value: '3', text: '行程结束' },
            ]
        }]
        this.state = {
            bikesInfo: {}
        }
        this.map = null
    }

    componentDidMount() {
        this.initMap()
        this.request()
    }

    request = (params = {}) => {
        Axios.ajax({
            url: '/mapbikes',
            params
        }).then(resp => {
            this.setState({
                bikesInfo: resp
            })
            this.renderMap()
        })
    }

    initMap = () => {
        this.map = new window.BMap.Map('mapContainer')
        //添加地图控件
        this.map.addControl(new window.BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }))
        this.map.addControl(new window.BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }))
    }
    renderMap = () => {
        this.map.clearOverlays()
        const BMap = window.BMap
        const { bike_list = [], route_list = [], service_list = [] } = this.state.bikesInfo
        const iconSize = new BMap.Size(36, 42)

        //设置中心点
        const endPointStr = route_list[route_list.length - 1]
        const epPoint = endPointStr ? endPointStr.split(',') : [116.397801, 40.01641]
        this.map.centerAndZoom(new BMap.Point(epPoint[0], epPoint[1]), 11)
        
        //绘制服务区域
        if (service_list.length > 0) {
            this.map.addOverlay(new BMap.Polygon(service_list.map(point => new BMap.Point(point.lon, point.lat)), {
                strokeColor: '#CE0000',
                strokeWeight: 2,
                strokeOpacity: 1,
                fillColor: '#ff8605',
                fillOpacity: 0.4
            }))
        }

        //绘制车辆标记
        if (bike_list.length > 0) {
            bike_list.forEach(bike => {
                const point = bike.split(',')
                const marker = new BMap.Marker(new BMap.Point(point[0], point[1]), {
                    icon: new BMap.Icon('/assets/bike.jpg', iconSize, {
                        imageSize: iconSize
                    })
                })
                this.map.addOverlay(marker)
            })
        }

        //绘制车辆行驶路线 暂不实现
    }

    handleFilterSearch = (fieldsValue) => {
        const timeObj = fieldsValue['start_end_time']
        const flag = timeObj && timeObj.length > 0
        if (flag) fieldsValue['start_end_time'] = null
        this.request(Object.assign({}, {
            ...fieldsValue,
            start_time: flag ? timeObj[0].format('YYYY-MM-DD HH:mm') : '',
            end_time: flag ? timeObj[1].format('YYYY-MM-DD HH:mm') : ''
        }))
    }
    render() {
        return (
            <div>
                <Card className="card-wrap">
                    <BaseForm handleFilterSearch={this.handleFilterSearch} formList={this.filterFormList} />
                </Card>
                <Card>
                    <div>共{this.state.bikesInfo.total_count}辆车</div>
                    <div id='mapContainer' style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}