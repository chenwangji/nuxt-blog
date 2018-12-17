<template>
  <header class="mobile-head">
    <form
      :class="{ active: search }"
      class="search"
      @submit.stop.prevent="searchTo">
      <input
        v-model.trim="keyword"
        :maxlength="20"
        type="text"
        placeholder="Search"
        required>
      <a
        href="javascript:;"
        @click="close">
        <i class="iconfont icon-close"/>
      </a>
    </form>

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
      <div>
        <a
          href="javascript:;"
          @click.stop.prevent="search = !search">
          <i class="iconfont icon-search"/>
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MobileHeader',

  data() {
    return {
      search: false,
      keyword: ''
    }
  },

  computed: {
    mobileSidebar() {
      return this.$store.state.options.mobileSidebar
    }
  },

  watch: {
    $route() {
      this.search = false
      this.toggleSidebar(false)
    }
  },

  methods: {
    toggleSidebar(state) {
      this.$store.commit('options/SET_MOBILE_SIDEBAR', state)
    },

    searchTo() {
      console.log(this.keyword)
      this.$router.push(`/search/${this.keyword}`)
    },

    close() {
      this.keyword = ''
      this.search = false
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

  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: $white;
    z-index: 999;
    @include css3-prefix('transform', 'translateY(-100%)');

    &.active {
      transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
      @include css3-prefix('transform', 'translateY(0)');
    }

    input {
      width: $container-right;
      height: 2rem;
      line-height: 2rem;
    }
  }
}
</style>
