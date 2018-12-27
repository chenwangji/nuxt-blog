<template>
  <section class="welcome">
    <div
      :class="{ mobile: mobileLayout }"
      class="haiyan" >
      <h4 class="mune">
        <nuxt-link to="/code">码农</nuxt-link>
        <span>/</span>
        <nuxt-link to="/think">思想</nuxt-link>
        <span>/</span>
        <nuxt-link to="/funk">民谣</nuxt-link>
      </h4>
    </div>
    <div
      v-if="!mobileLayout"
      class="will">
      <img
        src="/img/will.png"
        width="80">
    </div>
  </section>
</template>

<script>
export default {
  scrollToTop: true,
  transition: 'fade',

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    }
  },
  mounted() {
    this.$nextTick(() => {
      Promise.all([
        this.$store.dispatch('getArtList', { type: 1 }),
        this.$store.dispatch('getArtList', { type: 2 }),
        this.$store.dispatch('getArtList', { type: 3 })
      ])
    })
  }
}
</script>


<style lang="scss" scoped>
.welcome {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  background: url(/img/main_bg.jpg) no-repeat 20% 20%;
  background-size: cover;

  .haiyan {
    position: absolute;
    right: 80px;
    top: 280px;
    color: #eee;

    .mune {
      span {
        padding: 0.35rem;
      }
    }
  }

  .will {
    position: absolute;
    right: 40px;
    top: 40px;
  }

  .mobile.haiyan {
    top: 70px;
    left: 60px;
  }
}
</style>
