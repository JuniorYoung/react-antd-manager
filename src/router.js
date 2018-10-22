import React from 'react'
import {
    Route,
    HashRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Carousel from './pages/ui/carousel'
import Gallery from './pages/ui/gallery'
import FormLogin from './pages/form/login'
import FormReg from './pages/form/reg'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/bikemap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import Richtext from './pages/richtext'
import Permission from './pages/permission'
import NotMatch from './pages/not-match'
import App from './App'

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/common" render={() => (
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        )} />
                        <Route path="/" render={() => (
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/Loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notice} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/tabs" component={Tabs} />
                                    <Route path="/ui/gallery" component={Gallery} />
                                    <Route path="/ui/carousel" component={Carousel} />
                                    <Route path="/form/login" component={FormLogin} />
                                    <Route path="/form/reg" component={FormReg} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route path="/user" component={User} />
                                    <Route path="/bikeMap" component={BikeMap} />
                                    <Route path="/charts/bar" component={Bar} />
                                    <Route path="/charts/pie" component={Pie} />
                                    <Route path="/charts/line" component={Line} />
                                    <Route path="/richtext" component={Richtext} />
                                    <Route path="/permission" component={Permission} />
                                    <Redirect path="/" to="/home" />
                                    <Route component={NotMatch} />
                                </Switch>
                            </Admin>
                        )} />
                    </Switch>
                </App>
            </Router>
        )
    }
}