import React from 'react'
import { Card } from 'antd'
import echarts from 'echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import theme from '../echartTheme'
import ReactEcharts from 'echarts-for-react'

export default class Line extends React.Component {

    componentWillMount() {
        echarts.registerTheme('beauty', theme)
    }

    getOpt1 = () => ({
        title: {
            text: '用户骑行订单'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: [
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六',
                '周日'
            ]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '订单量',
                type: 'line',
                data: [
                    1000,
                    2000,
                    1500,
                    3000,
                    2000,
                    1200,
                    800
                ]
            }
        ]
    })

    getOpt2 = () => ({
        title: {
            text: '用户骑行订单'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend:{
            data:['OFO订单量','摩拜订单量']
        },
        xAxis: {
            data: [
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六',
                '周日'
            ]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'OFO订单量',
                type: 'line',
                stack: '总量',
                data: [
                    1200,
                    3000,
                    4500,
                    6000,
                    8000,
                    12000,
                    20000
                ]
            },
            {
                name: '摩拜订单量',
                type: 'line',
                stack: '总量',
                data: [
                    1000,
                    2000,
                    5500,
                    6000,
                    8000,
                    10000,
                    12000
                ]
            },
        ]
    })

    getOpt3 = () => ({
        title: {
            text: '用户骑行订单'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type:'category',
            boundaryGap: false,
            data: [
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六',
                '周日'
            ]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '订单量',
                type: 'line',
                data: [
                    1000,
                    2000,
                    1500,
                    3000,
                    2000,
                    1200,
                    800
                ],
                areaStyle: {}
            }
        ]
    })

    render() {
        return (
            <div>
                <Card className="card-wrap">
                    <ReactEcharts
                        option={this.getOpt1()}
                        theme="beauty"
                    />
                </Card>
                <Card className="card-wrap">
                    <ReactEcharts
                        option={this.getOpt2()}
                        theme="beauty"
                    />
                </Card>
                <Card className="card-wrap">
                    <ReactEcharts
                        option={this.getOpt3()}
                        theme="beauty"
                    />
                </Card>
            </div>
        )
    }
}