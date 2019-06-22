<template>
  <transition-group
    :class="{ 'mobile': mobileLayout }"
    class="article-box"
    tag="div"
    name="slide-down">
    <div
      v-for="item in articleList"
      :key="item._id"
      :class="{ 'mobile-article': mobileLayout }"
      class="article-item">
      <div class="content">
        <p class="title">
          <nuxt-link :to="`/article/${item._id}`">
            {{ item.title }}
          </nuxt-link>
        </p>
        <nuxt-link
          v-if="mobileLayout"
          :to="`/article/${item._id}`">
          <img
            :src="item.thumb + '?imageView2/1/w/350/h/180/q/75'"
            alt="缩略图"
            width="100%"
            class="mobile-img" >
        </nuxt-link>
        <p class="abstract">{{ item.descript | text(200) }}</p>
        <div class="meta">
          <span class="time">
            {{ item.create_at | dateFormat('yyyy.MM.dd') }}
          </span>
          <span class="hr" />
          <span class="read">{{ item.meta.views }} 次阅读</span>
          <span class="hr" />
          <span class="comments">{{ item.meta.comments }} 条评论</span>
          <span class="hr" />
          <span class="like">{{ item.meta.likes }} 人喜欢</span>
        </div>
      </div>
      <span class="article-line" />
    </div>
    <div
      v-if="!haveMoreArt"
      key="-1"
      class="end-article">
      <i>end</i>
    </div>
    <div
      v-else
      key="-2"
      class="loading-more end-article">
      <a
        v-if="!fetch"
        href="javascript:;"
        @click="$emit('loadMore')">
        <i>more</i>
      </a>
      <a
        v-else
        class="not-allow"
        href="javascript:;">
        <i>loading...</i>
      </a>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'ArticleBox',

  props: {
    articleList: {
      type: Array,
      default() {
        return []
      }
    },
    haveMoreArt: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    fetch() {
      return this.$store.state.article.fetch
    },
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    }
  }
}
</script>


<style lang="scss" scoped>
.article-box {
  width: $container-left;
  margin: 0 auto;

  > .article-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $lg-pad 0 $normal-pad;
    margin-bottom: $xlg-pad;
    color: $black;

    .title {
      margin-bottom: $sm-pad;
      font-size: $font-size-large;
      font-weight: 700;
    }

    &.mobile-article {
      &:hover {
        background: $module-bg;
      }

      > .content {
        width: 100%;
        margin: 0;

        > a {
          display: block;
          margin-bottom: 0.5rem;
          width: 100;
        }

        .meta {
          color: $descript;
        }

        .mobile-img {
          max-width: 100;
          max-height: 200px;
        }
      }
    }

    > .content {
      > .title {
        @include content-overflow(1);
      }

      > .abstract {
        margin: 2rem 0;
        min-height: 4rem;
        line-height: 1.8rem;
        color: $text;
        @include content-overflow(3);
      }

      > .meta {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-top: $sm-pad;
        height: 1rem;
        line-height: 1rem;
        font-size: $font-size-small;
        color: $descript;
      }
    }

    > a {
      display: block;
      width: 10rem;
    }

    > .article-line {
      position: absolute;
      left: -$mlg-pad;
      bottom: -$mlg-pad;
      width: $xlg-pad * 2;
      height: 1px;
      background: $border-color;
    }
  }

  .end-article {
    padding: $md-pad 0;
    color: $black;
  }

  &.mobile {
    width: 100%;

    > .end-article {
      margin-bottom: 0;
      padding: 1rem 0;
    }
  }
}
</style>
