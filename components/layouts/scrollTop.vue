<template>
  <transition-group
    v-if="$route.path !== '/'"
    tag="div"
    name="fade"
    class="scroll-aside">
    <a
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
  </transition-group>
</template>

<script>
export default {
  name: 'ScrollTop',

  data() {
    return {
      theme: ''
    }
  },

  mounted() {
    this.theme = window.localStorage.getItem('THEME') || 'light'
  },

  methods: {
    toggleTheme() {
      const isLight = document.body.id === 'light'

      this.theme = isLight ? 'dark' : 'light'

      document.body.id = this.theme
      window.localStorage.setItem('THEME', this.theme)
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
