/** comment */

export const state = () => {
  return {
    fetching: false,
    posting: false,
    data: {
      data: [],
      pagination: {}
    }
  }
}

export const mutations = {
  // 获取评论列表
  REQUEST_LIST(state) {
    state.fetching = true
  },

  GET_LIST_SUCCESS(state, payload) {
    state.fetching = false
    state.data = payload
  },

  GET_LIST_FAIL(state) {
    state.fetching = false
    state.data = {
      data: [],
      pagination: {}
    }
  },

  // 发表评论
  POST_ITEM(state) {
    state.posting = true
  },

  POST_ITEM_SUCCESS(state, res) {
    state.posting = false
    state.data.pagination.total += 1
    state.data.data.push(res.result)
  },

  POST_ITEM_FAILURE(state) {
    state.posting = false
  },

  // 喜欢某条评论
  LIKE_ITEM(state, likedComment) {
    const comment = state.data.data.find(item => {
      return Object.is(item._id, likedComment._id)
    })
    if (comment) comment.likes++
  }
}
