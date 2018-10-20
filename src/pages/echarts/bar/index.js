import React from 'react'
import { Card } from 'antd'
import echarts from 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import theme from '../echartTheme'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends React.Component {

    componentWillMount() {
        echarts.registerTheme('beauty', theme)
    }

    getOpt1 = () => ({
        title: {
            text: '用户骑行订单'
        },
        tooltip : {
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
                type: 'bar',
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
        tooltip : {
            trigger: 'axis'
        },
        legend:{
            data:['OFO','摩拜','小蓝']
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
                name: 'OFO',
                type: 'bar',
                data: [
                    2000,
                    3000,
                    5500,
                    7000,
                    8000,
                    12000,
                    20000
                ]
            },
            {
                name: '摩拜',
                type: 'bar',
                data: [
                    1500,
                    3000,
                    4500,
                    6000,
                    8000,
                    10000,
                    15000
                ]
            },
            {
                name: '小蓝',
                type: 'bar',
                data: [
                    1000,
                    2000,
                    2500,
                    4000,
                    6000,
                    7000,
                    8000
                ]
            },
        ]
    })

    render() {
        return (
            <div>
                <Card className="card-wrap">
                    <ReactEcharts
                        option={this.getOpt1()}
                        theme='beauty'
                    />
                </Card>
                <Card>
                    <ReactEcharts
                        option={this.getOpt2()}
                        theme='beauty'
                    />
                </Card>
            </div>
        )
    }
}