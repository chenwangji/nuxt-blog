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
const ArticleView = () => import('~/components/common/article')

export default {
  scrollToTop: true,

  transition: 'fade',

  head: {
    title: 'funk'
  },

  components: {
    ArticleView
  },

  fetch({ store }) {
    return store.dispatch('getArtList', { type: 3 })
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
        type: 3,
        current_page: this.$store.state.article.art.pagination.current_page + 1
      })
    }
  }
}
</script>
