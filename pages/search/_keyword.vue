<template>
  <div class="keyword">
    <p class="title">
      <span class="title-name">
        <i class="iconfont icon-search">
          {{ keyword }}
        </i>
      </span>
      <span class="line" />
    </p>

    <div class="article">
      <ArticleView
        :article-list="list"
        :have-more-art="haveMoreArt"
        @loadMore="loadMore"/>
    </div>
  </div>
</template>

<script>
import ArticleView from '~/components/common/article'

export default {
  name: 'Keyword',

  scrollToTop: true,

  transition: 'fade',

  head() {
    return { title: `${this.keyword} | keyword` }
  },

  components: {
    ArticleView
  },

  fetch({ store, params }) {
    return store.dispatch('getArtList', params)
  },

  computed: {
    keyword() {
      return this.$route.params.keyword
    },
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
        current_page: this.$store.state.article.art.pagination.current_page + 1,
        keyword: this.keyword
      })
    }
  }
}
</script>

<style scoped lang="scss">
.keyword > .title {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0rem;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: normal;

  i {
    margin-right: 0.5rem;
  }

  > .title-name {
    position: relative;
    padding-right: $lg-pad;
    background: $white;
    z-index: 99;
  }

  > .line {
    top: 50%;
  }
}
</style>
