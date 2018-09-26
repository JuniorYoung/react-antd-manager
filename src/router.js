import React from 'react'
import {
    Route,
    HashRouter as Router,
    Switch
} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Admin from './pages/admin'
import Buttons from './pages/ui/buttons'
import NotMatch from './pages/not-match'
import App from './App'

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() => (
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route component={NotMatch} />
                            </Switch>
                        </Admin>
                    )} />
                </App>
            </Router>
        )
    }
}