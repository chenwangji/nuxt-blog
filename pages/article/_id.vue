<template>
  <div
    :class="{ 'mobile': mobileLayout }"
    class="article-list">

    <div class="article-cont">
      <h3>{{ article.title }}</h3>
      <div class="meta">
        <span class="time">{{ article.create_at | dateFormat('yyyy.MM.dd hh:mm') }}</span>
        <span
          v-if="mobileLayout"
          class="num">
          字数{{ article.content.length }}
        </span>
        <span class="view">阅读 {{ article.meta.views }}</span>
        <span class="like">喜欢 {{ article.meta.likes }}</span>
        <span class="comment">评论 {{ article.meta.comments }}</span>
      </div>
      <div
        v-if="article.thumb"
        class="article-thumb">
        <img
          :src="article.thumb"
          alt="">
      </div>
      <div
        class="content"
        v-html="articleContent" />
    </div>

    <div class="item">
      <div class="info">
        <div class="info-left">
          <span
            class="liking"
            @click="like">
            <i
              :class="{'is-liked': isLiked}"
              class="iconfont icon-like like"/>
            <span>{{ article.meta.likes || 0 }}</span>
          </span>

          <span
            v-if="!mobileLayout"
            class="tag">
            <i class="iconfont icon-tag" />
            <nuxt-link
              v-for="tag in article.tag"
              :key="tag._id"
              :to="`/tag/${tag._id}`"
              class="tag-list">
              {{ tag.name }}
            </nuxt-link>
          </span>
        </div>
        <div>版权信息：
          <a
            href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
            target="_blank">非商用-署名-自由转载</a>
        </div>
      </div>
      <div class="share">
        <share class="article-share"/>
      </div>
    </div>

    <div class="comment">
      <comment
        v-if="article.title"
        :post-id="article.id"/>
    </div>

    <aside v-if="!mobileLayout">
      <div
        :class="{ 'is-liked': isLiked }"
        class="like"
        @click="like">
        <i
          :class="{ 'rubber-band': isLiked }"
          class="iconfont icon-like like"/>
        <div
          :class="{'active': isLiked}"
          class="like-decoration" />
        <span>{{ article.meta.likes || 0 }}</span>
      </div>
      <div
        class="comment"
        @click="scrollToComment">
        <i class="iconfont icon-comments" />
        <span>{{ article.meta.comments || 0 }}</span>
      </div>
    </aside>

    <dialog-com
      :visible.sync="showDialog"
      :class="{ 'dialog-mobile': mobileLayout }"
      :img="img" />
  </div>
</template>

<script>
import markdown from '~/plugins/marked'
import dialogCom from '~/components/common/dialog'
import share from '~/components/layouts/share'
import comment from '~/components/common/comment'
import { scrollTo } from '~/utils/scroll'

export default {
  name: 'MArticle',

  transition: 'fade',

  scrollToTop: true,

  fetch({ store, params }) {
    return store.dispatch('getArt', params)
  },

  head() {
    return { title: this.$store.state.article.details.title }
  },

  components: {
    dialogCom,
    share,
    comment
  },

  data() {
    return {
      likeArticles: [],
      showDialog: false,
      img: ''
    }
  },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    },

    article() {
      return this.$store.state.article.details
    },

    articleContent() {
      return markdown(this.article.content, false, true).html
    },

    isLiked() {
      return this.likeArticles.includes(this.article._id)
    }
  },

  mounted() {
    this.init()
    this.initEvent()
  },

  methods: {
    async like() {
      if (this.isLiked) return
      const res = await this.$store.dispatch('likeArt', {
        _id: this.article._id
      })
      if (res.code !== 1) alert(`文章点赞失败：${res.message}`)
      else {
        this.likeArticles.push(this.article._id)
        window.localStorage.setItem(
          'LIKE_ARTICLES',
          JSON.stringify(this.likeArticles)
        )
      }
    },

    init() {
      this.likeArticles = JSON.parse(
        window.localStorage.getItem('LIKE_ARTICLES') || '[]'
      )
    },

    initEvent() {
      const list = document.querySelectorAll('.img-pop')
      let _this = this
      list.forEach(img => {
        img.addEventListener('click', e => {
          e.stopPropagation()
          this.showDialog = true
          this.img = img.getAttribute('src')
        })
      })
    },

    hide() {
      this.showDialog = false
    },

    scrollToComment() {
      scrollTo(document.querySelector('#comment-box'), 500, { offset: 0 })
    }
  }
}
</script>
<style lang="scss">
.article-list {
  width: $container-min-width;
  margin: 0 auto;

  > .article-cont {
    > h3 {
      font-size: 1.3rem;
      color: $black;
    }

    > .meta {
      margin-top: 0.3rem;
      font-size: 0.8rem;
      color: var(--text-diabled);

      span {
        margin-right: 0.5rem;
      }
    }

    > .article-thumb {
      margin: $lg-pad 0;

      img {
        width: 100%;
        max-width: 100%;
      }
    }

    .content {
      margin: $lg-pad 0;
      color: $black;
      word-wrap: break-word;

      .demo {
        border: 1px solid $border-color;
        border-radius: 2px;
        padding: 25px 35px;
        margin-top: 1em;
        margin-bottom: 40px;
        font-size: 1.2em;
        line-height: 1.5em;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow-x: auto;
      }

      a {
        margin: 0 0.1rem;

        &.c-link {
          color: #7f8c8d;
        }

        &.image-link {
          margin: 0;
        }

        &:hover {
          text-decoration: underline;
        }
      }

      .image-package {
        text-align: center;
        width: 92%;
        margin: 0 auto 1rem auto;

        .img-caption {
          min-width: 10%;
          max-width: 80%;
          min-height: 22px;
          display: inline-block;
          padding: 6px;
          margin: 0 auto;
          border-bottom: 1px solid $border-color;
          font-size: 14px;
          color: var(--text-disabled);
          line-height: 1.2;

          &:empty {
            display: none;
          }
        }
      }

      img {
        max-width: 100%;
        margin: 0.5rem auto;
        display: block;
        text-align: center;
        border-radius: $radius;
        transition: all 0.25s;
        opacity: 0.9;

        &.img-pop {
          cursor: zoom-in;
        }
      }

      p {
        line-height: 1.8rem;
        margin-bottom: 1rem;

        &.text-center {
          text-align: center;
        }

        &.text-right {
          text-align: right;
        }
      }

      iframe {
        margin-bottom: 1rem;
        background: $black;

        &.music {
          background: transparent;
          width: 100%;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 1.5rem 0;
        padding-left: 0;
        line-height: 1.8rem;
        font-weight: 700;
        text-indent: 0;

        &:target {
          padding-top: 4.5rem;
        }
      }

      hr {
        height: 0.1rem;
        background: #e1e4e8;
        border: 0;
      }

      blockquote {
        padding: 0 1rem;
        margin-bottom: 1rem;
        color: #6a737d;
        border-left: 0.25rem solid #dfe2e5;

        p {
          text-indent: 0rem;

          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      ul {
        list-style-type: square;
      }

      ul,
      ol {
        padding-left: 2rem;
        margin-bottom: 1rem;

        > li {
          line-height: 1.8rem;
          padding: 0.5rem;
          list-style-type: disc;

          > p {
            text-indent: 0;
          }

          > ul {
            li {
              list-style-type: circle;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      ul {
        list-style: disc;
      }

      table {
        font-size: 0.8rem;
        max-width: 100%;
        overflow: auto;
        border: 1px solid $border-color;
        border-collapse: collapse;
        border-spacing: 0;

        thead {
          background: $module-bg;
          text-align: left;
        }

        th,
        td {
          padding: 0.8rem 0.5rem;
          line-height: 1.5rem;
        }

        tr:nth-child(2n) {
          background: $module-bg;
        }

        td {
          min-width: 7.5rem;
        }
      }

      code {
        padding: 0.2rem 0.4rem;
        margin: 0;
        font-size: 85%;
        border-radius: $radius;
        background-color: $module-hover-bg;
      }

      pre {
        margin-bottom: 1rem;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: $code-bg;
        border-radius: 3px;
        word-wrap: normal;

        > code {
          margin: 0;
          padding: 1rem;
          float: left;
          width: 100%;
          height: 100%;
          display: block;
          line-height: 1.6rem;
          background-color: transparent;
        }
      }
    }
  }

  > .item {
    margin: 3rem 0;
    padding: $lg-pad 0;

    > .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $disabled;

      > .info-left {
        display: flex;
        align-items: center;

        > .liking {
          i {
            vertical-align: middle;
          }

          span {
            margin-left: 0.4rem;
            vertical-align: middle;
          }
        }

        .like {
          cursor: pointer;
          margin-right: 0.3rem;
        }

        .is-liked {
          color: $red;
        }

        .tag {
          margin-left: 4rem;

          a {
            margin: 0 0.5rem;
            text-decoration: underline;

            &:last-child {
              margin: 0;
            }
          }
        }
      }

      a:hover {
        text-decoration: underline;
      }
    }

    > .share {
      margin-top: 1rem;
    }
  }

  > aside {
    position: fixed;
    right: 0;
    bottom: 16.8rem;

    > div {
      position: relative;
      width: $xlg-pad;
      height: $xlg-pad;
      text-align: center;
      line-height: $xlg-pad;
      border: 1px solid $border-color;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
      cursor: pointer;

      &.like:hover {
        color: $red;
        border-color: $red;
      }

      &.comment:hover {
        color: $green;
        border-color: $green;
      }

      &.is-liked {
        color: $red;
      }

      > i {
        font-size: 1.2rem;

        &.rubber-band {
          animation-fill-mode: both;
          animation-name: rubberBand;
        }
      }

      @keyframes rubberBand {
        0% {
          transform: scaleX(1);
        }
        30% {
          transform: scale3d(1.25, 0.75, 1);
        }
        40% {
          transform: scale3d(0.75, 1.25, 1);
        }
        50% {
          transform: scale3d(1.15, 0.85, 1);
        }
        65% {
          transform: scale3d(0.95, 1.05, 1);
        }
        75% {
          transform: scale3d(1.05, 0.95, 1);
        }
        100% {
          transform: scaleX(1);
        }
      }

      > span {
        position: absolute;
        left: -0.8rem;
        top: -10px;
        line-height: 1;
        color: $black;
        font-size: 1rem;
        padding: $xs-pad $sm-pad;
        background: $border-color;
        border-radius: 0.7rem;
        transform: scale(0.75);
      }

      > .like-decoration {
        position: absolute;
        top: calc(1.5rem - 50px);
        left: calc(1.5rem - 50px);
        width: 100px;
        height: 100px;
        background: url(../../static/img/like_decoration.png) 0 0 no-repeat;
        transition: background-position 1s steps(25);
        transition-duration: 0;

        &.active {
          transition-duration: 1s;
          background-position: -2500px 0;
        }
      }
    }
  }

  // 针对图片 dialog 重置 dialog 样式
  .dialog {
    > .dialog-body {
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100%;
      background: transparent;

      > .dialog-content {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        img {
          display: block;
          margin: 0 auto;
          max-width: 90%;
          max-height: 90%;
          cursor: zoom-out;
        }
      }
    }
  }
}
</style>
