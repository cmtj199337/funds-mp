import http from '@/utils/request'

// 创建文章
export const createArticle = (data) => {
  return http.post('/content/articles', data)
}

// 查询文章列表
export const articles = (data) => {
  return http.get('/content/articles', { params: data })
}

// 查询文章详情
export const articleDetail = (id) => {
  return http.get('/content/articles/' + id)
}

// 更新文章内容
export const articleUpdate = (id, data) => {
  return http.put('/content/articles/' + id, data)
}

// 删除文章
export const delArticle = (id) => {
  return http.delete('/content/articles/' + id)
}