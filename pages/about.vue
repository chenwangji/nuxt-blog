<template>
  <div
    :class="{mobile: mobileLayout}"
    class="about">
    <div class="title">
      <span class="title-name">关于我</span>
      <span class="line"/>
    </div>
    <div
      :class="{'info-mobile': mobileLayout}"
      class="info-box">
      <div class="info">
        <div class="list">
          <i class="iconfont icon-user"/>
          <span class="list-content">Wangji, a 90s boy.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-like"/>
          <span class="list-content">Code, read and music.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-music"/>
          <span class="list-content">Folk and soft Music.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-coffee"/>
          <span class="list-content">Hello world!</span>
        </div>
        <div class="list">
          <i class="iconfont icon-comments"/>
          <span class="list-content icons">
            <a
              href="https://github.com/chenwangji"
              target="_blank">
              <i class="iconfont icon-github"/>
            </a>
            <a
              href="https://weibo.com/2730539220/profile?rightmod=1&wvr=6&mod=personinfo"
              target="_blank">
              <i class="iconfont icon-weibo"/>
            </a>
            <a
              href="https://twitter.com/chenwangji"
              target="_blank">
              <i class="iconfont icon-twitter"/>
            </a>
            <a
              href="https://juejin.im/user/58161e4cda2f60005dc4900d"
              target="_blank">
              <i class="iconfont icon-juejin"/>
            </a>
            <a
              href="https://segmentfault.com/u/qikeers"
              target="_blank">
              <i class="iconfont icon-sf"/>
            </a>
            <a
              href="https://www.zhihu.com/people/chen-you-cheng-60/activities"
              target="_blank">
              <i class="iconfont icon-zhihu"/>
            </a>
            <a
              href="mailto:chenwangji_main@foxmail.com">
              <i class="iconfont icon-email"/>
            </a>
          </span>
        </div>
      </div>
      <div class="user-box">
        <div class="user">
          <img
            :src="user.gravatar"
            width="100%"
          >
        </div>
      </div>
    </div>

    <p
      :class="{'title-mobile': mobileLayout}"
      class="title more">
      <span class="title-name">More</span>
      <span class="line"/>
    </p>
    <div class="text-box">
      <div class="text">
        <p>Too young too simple, sometimes native</p>
        <p>Have so many new ideas, <br v-if="mobileLayout">maybe i will go to relize it</p>
        <p>Enjoy the present</p>
        <p>Always on the road</p>
        <p>All of me in the code and music</p>
      </div>
    </div>

    <p
      :class="{'title-mobile': mobileLayout}"
      class="title more">
      <span class="title-name">Friends</span>
      <span class="line"/>
    </p>
    <div class="friend">
      <a
        v-for="(friend,index) in friends"
        :key="index"
        :href="friend.url"
        target="_blank">
        {{ friend.name }}
      </a>
    </div>

    <p class="title more">
      <span class="title-name">还有啥？</span>
      <span class="line"/>
    </p>
    <div class="last">
      <p>你可以在下面申请友请链接，称呼 + 网址 。</p>
    </div>

    <div class="comment">
      <comments :post-id="0"/>
    </div>
  </div>
</template>

<script>
import comments from '~/components/common/comment'

export default {
  name: 'About',

  transition: 'fade',

  head: {
    title: 'About'
  },

  components: { comments },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    },

    user() {
      return this.$store.state.options.adminInfo
    },

    friends() {
      return [
        { name: '百度', url: 'https://baidu.com' },
        { name: '谷歌', url: 'https://google.com' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  width: $container-min-width;
  margin: 0 auto;

  > .title {
    position: relative;
    padding: 0.5rem 0;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

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

  > .title.more {
    margin-top: 2rem;
  }

  > .title-mobile {
    margin-top: 0;
  }

  > .last {
    padding: 2rem;
    border: 0;

    p {
      margin: 0.5rem 0;
    }

    a {
      text-decoration: underline;
    }
  }

  .friend {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 2rem 1rem 2rem;

    a {
      width: 30%;
      height: 3rem;
      margin-bottom: 1rem;
      margin-right: 5%;
      line-height: 3rem;
      text-align: center;
      background: $code-bg;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  > .info-box {
    display: flex;
    justify-content: space-between;

    > .info {
      position: relative;
      width: calc(100% - 16rem - 1rem);
      padding: $normal-pad 0;

      > .list {
        display: flex;
        margin: 0.5rem;
        padding: 0 1rem;
        height: 36px;
        line-height: 36px;

        i {
          color: $dividers;
        }

        > .list-content {
          margin-left: 1rem;
        }

        span.icons {
          display: flex;

          a {
            margin-right: 1rem;
          }

          i {
            color: $text;
            transition: all 0.5s;

            &:hover {
              font-size: 1.3rem;
              color: $black;
            }
          }
        }
      }
    }

    > .user-box {
      width: 16rem;
      padding-right: 2rem;

      .user {
        padding: 1rem;
        overflow: hidden;

        img {
          max-width: 100%;
          @include border-radius(4px);
        }
      }
    }
  }

  > .comment {
    margin-top: 2rem;
  }

  &.mobile {
    width: 100%;
    transform: translate(0);

    > .info-box {
      width: 100%;
      flex-direction: column-reverse;

      > .info {
        padding: 1rem;
        width: 100%;

        > .list {
          padding: 0;
          @include text-overflow();
        }
      }
      > .user-box {
        width: 100%;
        padding-right: 0;

        > .user {
          padding: 1.5rem;
        }
      }
    }
    .text-box .text {
      padding: 1.5rem;
      text-align: left;
    }
  }

  > .text-box {
    margin-top: 1rem;

    > .text {
      padding: 3rem;
      line-height: 2rem;
      text-align: center;
    }
  }
}
</style>
