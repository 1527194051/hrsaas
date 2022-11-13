// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器

import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 2000// 定义超时时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(async config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时了 '))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
}) // 请求拦截器
service.interceptors.response.use(
  res => {
    // console.log(res)
    const { success, message, data } = res.data
    // console.log(data)
    // debugger
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  }
  , error => {
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }

)
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}// 响应拦截器
export default service // 导出axios实例;
