/** article */

export const state = () => ({
  // 列表文章
  art: {
    pagination: {},
    list: []
  },

  fetch: false,

  // 文章详情
  details: {}
})

export const mutations = {
  FETCH_ART(state) {
    state.fetch = true
  },

  SET_ART_SUCCESS(state, data) {
    state.fetch = false
    state.art = data
  },

  SET_ART_FAIL(state) {
    state.fetch = false
    state.art = {
      pagination: {},
      list: []
    }
  },

  SET_DETAILS(state, data) {
    state.details = data
  }
}
