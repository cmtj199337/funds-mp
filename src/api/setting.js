import http from '@/utils/request'

// 创建目录
export const createCatalog = (data) => {
  return http.post('/setting/catalog', data)
}

// 查询目录列表
export const catalogs = (data) => {
  return http.get('/setting/catalog', { params: data })
}