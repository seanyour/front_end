import http from './http'

export interface LoginData {
  username: string
  password: string
}

export const login = async (data: LoginData) => {
  return await http.post('/auth/login', {
    username: data.username,
    password: data.password,
  })
}

export const verifyCaptcha = async (captcha: string) => {
  return await http.post('/auth/verifyCaptcha', {
    captcha,
  })
}
