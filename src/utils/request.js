import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { apiBaseUrl } from '@/configs'

const http = axios.create({
  'baseURL': apiBaseUrl.main,
  'headers': {
      'Content-Type': 'application/json;charset=UTF-8'
  },
  validateStatus: (status) => {
    return status < 400
  },
  timeout: 5000
})

const req = {
  'resolve': config => {
      if (store.getters.token || localStorage.token) {
          config.headers.token = localStorage.token
      }
      return config
  },
  'reject': (error) => {
      return Promise.reject('req', error)
  }
}

const res = {
  'resolve': (response) => {
    let res = response.data
    if (res.code == 1) {
      return res
    } else {
      return Promise.reject(res)
    }
  },
  'reject': (error) => {
      if (error.response.status === 401) {
          MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              store.dispatch('FedLogOut').then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
              })
          })
          return Promise.reject(null)
      }
      return Promise.reject(error.response.data)
  }
}
http.interceptors.request.use(req.resolve, req.reject)
http.interceptors.response.use(res.resolve, res.reject)

export default http
