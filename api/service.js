import ax from './axios'

// 获取文章列表
export function getArts(params) {
  return ax.get('/article', { params })
}

// 获取文章详情
export function getArt(params) {
  return ax.get(`/article/${params.id}`)
}
