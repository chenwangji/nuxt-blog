<template>
  <div class="app">
    <div
      :class="{ 'open': mobileSidebar }"
      class="app-main">

      <div
        v-if="mobileLayout"
        :class="{ 'open': mobileSidebar }"
        class="app-aside" >
        <mobile-side />
      </div>

      <transition name="fade">
        <div
          v-if="!isWelcome"
          class="header-box">
          <mobile-header v-if="mobileLayout" />
          <my-header v-else />
        </div>
      </transition>

      <transition-group
        :class="{ 'mobile': mobileLayout }"
        name="slide-up"
        tag="div"
        class="container clearfix main-container">
        <div
          key="1"
          :class="{ 'mobile-layout': mobileLayout }"
          class="content-left">
          <nuxt />
        </div>
      </transition-group>

      <transition name="fade">
        <my-footer v-if="!isWelcome && !isError"/>
      </transition>
    </div>
    <scroll-top />
  </div>
</template>

<script>
import myHeader from '~/components/layouts/header'
import scrollTop from '~/components/layouts/scrollTop'
import myFooter from '~/components/layouts/footer'

import mobileSide from '~/components/mobile/aside'
import mobileHeader from '~/components/mobile/header'

export default {
  head() {
    return !this.mobileLayout
      ? {}
      : {
          bodyAttrs: {
            class: 'mobile'
          }
        }
  },

  components: {
    myHeader,
    myFooter,
    scrollTop,
    mobileSide,
    mobileHeader
  },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    },
    isWelcome() {
      return this.$store.state.options.isWelcome
    },
    isError() {
      return this.$store.state.options.isError
    },
    mobileSidebar() {
      return this.$store.state.options.mobileSidebar
    }
  },

  mounted() {
    const theme = window.localStorage.getItem('THEME') || 'light'
    document.body.id = theme
  }
}
</script>

<style lang="scss" scoped>
.app {
  .app-aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    height: 100%;
    width: calc(60vw);
    background: $white;
    @include box-shadow(1px, 0, 2px, rgba(0, 0, 0, 0.05));
    transform: translateX(-100%);
    transition: all 0.3s ease-out;

    > .mobile-aside {
      opacity: 0;
      transition: all 0.3s ease-out;
      transform: scale(0.8);
    }
  }

  .app-aside.open {
    transform: translateX(0);

    > .mobile-aside {
      opacity: 1;
      transform: scale(1);
    }
  }

  > .app-main {
    transition: all 0.3s ease-out;

    > .main-container {
      min-height: calc(100vh - 156px);
      margin-top: $normal-pad;
    }

    > .main-container.mobile {
      min-height: calc(100vh - 56px);
    }
  }

  > .app-main.open {
    // transform: translateX(60%);
  }
}

.content-left {
  position: relative;
  width: $container-left;
  float: left;
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.content-left.full-page,
.content-left.mobile-layout {
  width: 100%;
  transition: width 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.content-left.mobile-layout {
  width: 100%;
  margin: 0;
  padding: 1rem;
  padding-top: 4.5rem;
}

.mobile {
  width: 100%;
}
</style>
