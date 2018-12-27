/**
 * 留言
 */

export const state = () => ({
  data: {
    list: [],
    pagination: {}
  },

  fetch: false,
  posting: false
})

export const mutations = {
  FETCH_HERO(state) {
    state.fetch = true
  },

  SET_HERO_SUCCESS(state, data) {
    state.data = data
    state.fetch = false
  },

  SET_HERO_FAIL(state) {
    state.data = {
      list: [],
      pagination: {}
    }

    state.fetch = false
  },

  POST_ITEM(state) {
    state.posting = true
  },

  POST_ITEM_FINAL(state) {
    state.posting = false
  }
}
