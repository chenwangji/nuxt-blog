<template>
  <section class="error-page">
    <img
      src="/img/logo.png"
      alt="Logo"
      width="200">
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <nuxt-link
      v-if="error.errorCode === 404"
      to="/"
      class="button"/>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      default() {
        return {}
      },
      type: Object
    }
  },

  transition: 'fade',

  mounted() {
    this.$store.commit('options/SET_ERROR_PAGE', true)
  },

  beforeDestroy() {
    this.$store.commit('options/SET_ERROR_PAGE', false)
  }
}
</script>

<style lang="scss" scoped>
.error-page {
  text-align: center;
  min-height: 20rem;
  margin: 10rem 0;

  .title {
    margin-top: 15px;
    font-size: 5em;
  }

  .button {
    margin-top: 50px;
  }
}
</style>
