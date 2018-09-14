import JsonP from 'jsonp'

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
}