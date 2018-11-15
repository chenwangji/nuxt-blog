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
    title: 'think'
  },

  components: {
    ArticleView
  },

  fetch({ store }) {
    console.log('fetch')
    return store.dispatch('getArtList', { type: 2 })
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
        type: 2,
        current_page: this.$store.state.article.art.pagination.current_page + 1
      })
    }
  }
}
</script>
