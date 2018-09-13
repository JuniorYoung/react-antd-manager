import React from 'react'
import ReactDOM from 'react-dom'
import Admin from './pages/admin'
import registerServiceWorker from './registerServiceWorker'
import './style/common.less'

ReactDOM.render(<Admin />, document.getElementById('root'))
registerServiceWorker()
