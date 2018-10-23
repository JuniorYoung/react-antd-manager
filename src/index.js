import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './router'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './redux/store'
import './style/common.less'

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
