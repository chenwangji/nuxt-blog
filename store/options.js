export const state = () => {
  return {
    // 是否为移动端
    mobileLayout: false,

    // ua
    userAgent: '',

    // 欢迎页面
    isWelcome: true
  }
}

export const mutations = {
  // 设置是否移动端状态
  SET_MOBIBLE_LAYOUT(state, action) {
    state.mobileLayout = action
  },

  // 设置 UA
  SET_USER_AGENT(state, action) {
    state.userAgent = action
  },

  // 设置是否是欢迎页面
  CHANGE_WEL_PAGE(state, action) {
    state.isWelcome = action
  }
}
