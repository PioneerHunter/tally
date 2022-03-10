import axios from 'axios'

export default {
  get(url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => { 
      axios.request({
        url,
        method: 'get',
        params,
        headers,
      }).then((res) => {
        const { data } = res
        if (data.desc === 'OK') {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch((err) => {
        console.log('失败' + err);
      })
    })
  }
}