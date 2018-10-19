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
  }
}
