import axiso from 'axios'

const http = axiso.create({
  baseURL: 'http://localhost:3000',
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
    return Promise.reject(error)
  }
)

export default http
