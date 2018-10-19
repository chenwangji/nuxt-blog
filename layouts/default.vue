<template>
  <div class="app">
    <div
      v-if="mobileLayout"
      class="app-aside" >
      shouji
    </div>
    <div class="app-main">
      <transition name="fade">
        <div
          v-if="!isWelcome"
          class="header-box">
          <my-header />
        </div>
      </transition>
      <nuxt/>
    </div>
    <scroll-top />
  </div>
</template>

<script>
import myHeader from '~/components/layouts/header'
import scrollTop from '~/components/layouts/scrollTop'

export default {
  components: {
    myHeader,
    scrollTop
  },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    },
    isWelcome() {
      return this.$store.state.options.isWelcome
    }
  },

  mounted() {
    console.log(this.$store)
    const theme = window.localStorage.getItem('THEME') || 'light'
    document.body.id = theme
  }
}
</script>
