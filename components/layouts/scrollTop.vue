<template>
  <transition-group
    v-if="$route.path !== '/'"
    tag="div"
    name="fade"
    class="scroll-aside">
    <a
      v-if="!mobileLayout"
      key="2"
      href="javascript:;"
      class="scroll-btn theme"
      @click="toggleTheme">
      <i
        :class="{
          'icon-dark': theme === 'light',
          'icon-light': theme === 'dark'
        }"
        class="iconfont" />
    </a>
    <a
      v-if="showScroll"
      key="1"
      class="scroll-btn"
      @click="scrollTop" >
      <i class="iconfont icon-arrow-up" />
    </a>
  </transition-group>
</template>

<script>
import { getScrollTop } from '~/utils/common'
export default {
  name: 'ScrollTop',

  data() {
    return {
      theme: '',
      showScroll: false
    }
  },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    }
  },

  mounted() {
    // theme
    this.theme = window.localStorage.getItem('THEME') || 'light'

    // scrollTop
    // 浏览器视口的高度
    function getWindowHeight() {
      return window.innerHeight
    }
    window.addEventListener('scroll', () => {
      if (getWindowHeight() < getScrollTop() * 2) {
        this.showScroll = true
      } else {
        this.showScroll = false
      }
    })
  },

  methods: {
    toggleTheme() {
      const isLight = document.body.id === 'light'

      this.theme = isLight ? 'dark' : 'light'

      document.body.id = this.theme
      window.localStorage.setItem('THEME', this.theme)
    },
    scrollTop() {
      let timer = null
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 150
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-aside {
  position: fixed;
  right: 0;
  bottom: 8rem;

  > .scroll-btn {
    display: block;
    width: $xlg-pad;
    height: $xlg-pad;
    margin-bottom: 0.5rem;
    color: #5ab95c;
    background: $module-bg;
    text-align: center;
    line-height: 2.7rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
    border-color: 1px solid $border-color;
    cursor: pointer;

    &.theme {
      color: $black;

      i {
        font-size: $font-size-large;
      }
    }
  }
}
</style>
