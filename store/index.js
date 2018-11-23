import service from '../api'

export const actions = {
  nuxtServerInit(store, { req }) {
    // context.isServer, context.isClient is depricated in nuxt^2.0.0
    // 设备类型
    const isServer = process.server
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/gi.test(
      userAgent
    )

    store.commit('options/SET_MOBIBLE_LAYOUT', isMobile)
    store.commit('options/SET_USER_AGENT', userAgent)
  },

  // 获取文章列表
  async getArtList({ commit, state }, data = { current_page: 1 }) {
    commit('article/FETCH_ART')
    const res = await service.getArts(data).catch(err => console.error(err))
    if (res && res.code === 1) {
      let list
      if (res.result.pagination.current_page === 1) list = res.result.list
      else list = [...state.article.art.list, ...res.result.list]
      commit('article/SET_ART_SUCCESS', {
        list,
        pagination: res.result.pagination
      })
    } else commit('article/SET_ART_FAIL')
    return res
  },

  // 文章详情
  async getArt({ commit }, data) {
    const { result } = await service.getArt(data).catch(e => console.error(e))
    commit('article/SET_DETAILS', result || {})
  },

  // 喜欢文章
  async likeArt({ commit }, data) {
    const res = await service
      .likeArt({ ...data, type: 0 })
      .catch(e => console.error(e))
    if (res && res.code === 1) commit('article/SET_LIKE')
    return res
  },

  // 根据 post_id 获取评论列表
  async loadCommentsByPostId({ commit, state }, data) {
    data.sort = data.sort || -1
    data.current_page = data.current_page || 1
    data.page_size = data.page_size || 20

    commit('comment/REQUEST_LIST')
    setTimeout(async () => {
      const res = await service.getComments(data).catch(e => console.error(e))
      if (res && res.code === 1) {
        let list
        if (res.result.pagination.current_page === 1) list = res.result.data
        else list = [...state.comment.data.data, res.result.data]
        commit('comment/GET_LIST_SUCCESS', {
          data: list,
          pagination: res.result.pagination
        })
      } else commit('comment/GET_LIST_FAIL')
      return res
    }, 500)
  },

  // 发表评论
  async postComment({ commit }, comment) {
    commit('comment/POST_ITEM')
    const res = await service.postComment(comment).catch(e => console.error(e))
    if (res && res.code === 1) {
      commit('comment/POST_ITEM_SUCCESS', res)
      if (comment.post_id !== 0) commit('article/ADD_COMMENT')
    } else commit('comment/POST_ITEM_FAILURE')
    return res
  }
}
