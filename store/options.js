export const state = () => {
  return {
    // 是否为移动端
    mobileLayout: false,

    // ua
    userAgent: '',

    // 欢迎页面
    isWelcome: true,

    isError: false,

    // 移动端侧边栏
    mobileSidebar: false
  }
}

export const mutations = {
  // 设置是否移动端状态
  SET_MOBIBLE_LAYOUT(state, action) {
    state.mobileLayout = action
  },

  // 设置是否移动端侧边栏是否显示
  SET_MOBILE_SIDEBAR(state, action) {
    state.mobileSidebar = action
  },

  // 设置 UA
  SET_USER_AGENT(state, action) {
    state.userAgent = action
  },

  // 设置是否是欢迎页面
  CHANGE_WEL_PAGE(state, action) {
    state.isWelcome = action
  },

  // 设置是否是错误页面
  SET_ERROR_PAGE(state, action) {
    state.isError = action
  }
}
