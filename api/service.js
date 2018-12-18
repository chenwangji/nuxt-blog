import ax from './axios'

// 获取文章列表
export function getArts(params) {
  return ax.get('/article', { params })
}

// 获取文章归档
export function getAllArts() {
  return ax.get('/getAllArts')
}

// 获取文章详情
export function getArt(params) {
  return ax.get(`/article/${params.id}`)
}

// 喜欢文章
export function likeArt(params) {
  return ax.post('/like', params)
}

// 获取评论列表
export function getComments(params) {
  return ax.get('/comments', { params })
}

// 提交评论
export function postComment(data) {
  return ax.post('/comment', data)
}

// 喜欢评论
export function likeComment(data) {
  return ax.post('/like', data)
}

// 获取标签
export function getTag(params) {
  return ax.get('/tag', { params })
}
