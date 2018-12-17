<template>
  <section class="clearfix main">
    <div class="article">

      <ArticleView
        :article-list="list"
        :have-more-art="haveMoreArt"
        @loadMore="loadMore"/>

    </div>
  </section>
</template>

<script>
import ArticleView from '~/components/common/article'

export default {
  scrollToTop: true,

  transition: 'fade',

  head: {
    title: 'code'
  },

  components: {
    ArticleView
  },

  fetch({ store }) {
    return store.dispatch('getArtList', { type: 1 })
  },

  computed: {
    list() {
      return this.$store.state.article.art.list
    },
    haveMoreArt() {
      const {
        current_page,
        total_page
      } = this.$store.state.article.art.pagination
      return current_page !== total_page
    }
  },
  methods: {
    loadMore() {
      return this.$store.dispatch('getArtList', {
        type: 1,
        current_page: this.$store.state.article.art.pagination.current_page + 1
      })
    }
  }
}
</script>
