import React from 'react'
import ReactDOM from 'react-dom'
import Admin from './pages/admin'
import AppRouter from './router'
import registerServiceWorker from './registerServiceWorker'
import './style/common.less'

ReactDOM.render(<AppRouter />, document.getElementById('root'))
registerServiceWorker()
