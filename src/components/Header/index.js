import React from 'react'
import { Row, Col } from 'antd'
import Axios from '../../axios'
import Utils from '../../utils'
import './index.less'
import { connect } from 'react-redux'

class Header extends React.Component {

    state = {
        userName: '',
        date: '',
        dayPictureUrl: '',
        weather: ''
    }

    componentWillMount() {
        this.setState({
            userName: 'JuniorYoung',
            date: Utils.formateDate()
        })
        this.getWeatherAPIData()
    }

    getWeatherAPIData = () => {
        const city = '济南'
        const url = `https://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=7a1c2d0fc57b20fd7e1b2848281967f5`
        Axios.jsonp(url).then( resp => { 
            const { dayPictureUrl, weather } = resp.results[0].weather_data[0];
            this.setState({
                dayPictureUrl,
                weather
            })
        })
    }

    render() {
        const { menuType } = this.props

        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? 
                        <Col span="6" className="logo">
                            <img src="./assets/logo-ant.svg" alt="" />
                            <span>订单详情</span>
                        </Col> : ''}
                    <Col span={menuType ? '18' : '24'} className="userinfo">
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType? '' :
                    <Row className="breadcrumb">
                        <Col span="4" className="breadcrumb-title">
                            { this.props.menuName }
                        </Col>
                        <Col span="20" className="weather">
                            <span className="date">{this.state.date}</span>
                            <span className="weather-img">
                                <img src={this.state.dayPictureUrl} alt="" />
                            </span>
                            <span className="weather-detail">{this.state.weather}</span>
                        </Col>
                    </Row> 
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    menuName: state.menuName
})

export default connect(mapStateToProps)(Header)