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
            timeout: 5000
        }, opts)
        return new Promise((resolve, reject) => {
            axios(config).then(resp => {
                if (resp.status === 200) {
                    const res = resp.data
                    if (res.code === 200) {
                        // 成功
                        resolve(res.data)
                    } else {
                        message.error(res.message)
                    }
                } else {
                    reject()
                }
                if (loadingEle) loadingEle.style.display = 'none'
            })
        })
    }
}