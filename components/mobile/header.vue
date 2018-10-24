<template>
  <header class="mobile-head">
    <nav>
      <div>
        <a
          href="javascript:;"
          @click.stop.prevent="toggleSidebar(!mobileSidebar)">
          <i class="iconfont icon-list" />
        </a>
      </div>
      <div class="name">
        <nuxt-link to="/">
          <img
            src="/img/logo.png"
            width="30">
        </nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MobileHeader',

  data() {
    return {}
  },

  computed: {
    mobileSidebar() {
      return this.$store.state.options.mobileSidebar
    }
  },

  methods: {
    toggleSidebar(state) {
      this.$store.commit('options/SET_MOBILE_SIDEBAR', state)
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-head {
  position: relative;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  padding: 0 1rem;
  height: $header-height - 0.5;
  line-height: $header-height - 0.5;
  background: $white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  > nav {
    display: flex;
    justify-content: space-between;

    > .name {
      font-size: $font-size-large;
      color: $black;
    }
  }
}
</style>
