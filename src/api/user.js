import http from '@/utils/request'

// 注册
export const register = (data) => {
  return http.post('/users/register', data)
}

// 登录
export const login = (data) => {
  return http.post('/users/login', data)
}