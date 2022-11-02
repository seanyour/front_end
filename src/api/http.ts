import axiso from 'axios'
import { ElMessage } from 'element-plus'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    success: boolean,
    message: string,
    pass: boolean
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const http = axiso.create({
  baseURL: '/api',
  timeout: 5000,
})

http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    ElMessage.error(error.response.data.message)
    return Promise.reject(error)
  }
)

export default http
