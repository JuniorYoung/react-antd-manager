import JsonP from 'jsonp'
import axios from 'axios'
import { message } from 'antd'

export default class Axios {
    static jsonp(url, opts = {}) {
        return new Promise((resolve, reject) => {
            JsonP(url, opts, function(err, resp) {
                if (resp.status === 'success') {
                    resolve(resp)
                } else {
                    reject(resp.message)
                }
            })
        })
    }

    static ajax(opts) {
        let loadingEle;
        // loading效果
        if (opts.isShowLoading) {
            loadingEle = document.getElementById('ajaxLoading')
            loadingEle.style.display = 'block'
        }

        const config = Object.assign({
            method: 'get',
            baseURL: 'https://easy-mock.com/mock/5bb07735f5f4011584b5c62c/react-antd',
            timeout: 3000
        }, opts)
        return new Promise((resolve, reject) => {
            axios(config).then(resp => {
                if (resp.status === 200) {
                    const data = resp.data
                    if (data.success) {
                        // 成功
                        resolve(data.result)
                    } else {
                        message.error(data.message)
                    }
                } else {
                    reject()
                }
                if (loadingEle) loadingEle.style.display = 'none'
            })
        })
    }
}