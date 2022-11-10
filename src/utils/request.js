// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器

import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(config => {
  return config
}) // 请求拦截器
service.interceptors.response.use(
  res => {
    const { success, message, data } = res.data

    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  }
  , error => {
    Message.error(error.message)
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例;
