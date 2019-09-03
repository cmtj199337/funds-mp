import http from '@/utils/request'

// 创建文章
export const createArticle = (data) => {
  return http.post('/content/articles', data)
}

// 查询文章列表
export const articles = (data) => {
  return http.get('/content/articles', { params: data })
}