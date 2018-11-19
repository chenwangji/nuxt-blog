const pkg = require('./package')

module.exports = {
  mode: 'universal',

  cache: {
    max: 1000,
    maxAge: 900000
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#24292e' },

  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/scss/index.scss', lang: 'scss' },
    'highlight.js/styles/github.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/filter.js' },
    { src: '~/plugins/highlight.js' },
    { src: '~/plugins/marked.js' },
    { src: '~/plugins/clickOutside.js', ssr: false },
    { src: '~/plugins/copy.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    // '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  // axios: {
  //   // See https://github.com/nuxt-community/axios-module#options
  // },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    styleResources: {
      scss: ['./assets/scss/variable.scss', './assets/scss/mixin.scss'],
      options: {}
    },
    // postcss
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')()
    ],
    // 将重复引用的(第三方/自有)模块添加到vendor.bundle.js
    vendor: ['axios', 'marked', 'highlight.js']
  },
  dev: process.env.NODE_ENV !== 'production',
  router: {
    middleware: ['layout'],
    linkActiveClass: 'link-active'
  }
}
