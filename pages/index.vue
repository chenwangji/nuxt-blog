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

    <div class="right">
      <a href="http://www.beian.miit.gov.cn/" target="_blank">
        <img class="beian" src="https://pic3.zhimg.com/80/v2-d0289dc0a46fc5b15b3363ffa78cf6c7.png">
        粤ICP备18147451号
      </a>
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

  .right {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #fff;

    img.beian {
      display: inline-block;
      height: 15px;
      vertical-align: middle;
      transform: translateY(-2px);
    }
  }

}
</style>
