<template>
  <section class="clearfix main">
    <div class="article">

      <ArticleView />

    </div>
  </section>
</template>

<script>
import ArticleView from '~/components/common/article'

export default {
  scrollToTop: true,

  transition: 'fade',

  components: {
    ArticleView
  }
}
</script>

<style lang="scss" scoped>
</style>
