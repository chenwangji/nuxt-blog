<template>
  <header
    v-fix
    class="darken">
    <div class="header">
      <div class="header-left">
        <div class="logo">
          <nuxt-link to="/">
            <img
              src="/img/logo.png"
              width="36">
          </nuxt-link>
        </div>
        <nav>
          <nuxt-link
            v-for="(list, index) in nav"
            :key="index"
            :to="list.path"
            exct>
            <span>{{ list.name }}</span>
          </nuxt-link>
        </nav>
      </div>
      <div class="header-right">
        <div
          v-click-outside="hide"
          key="1"
          class="search-box"
          @click="open = true">
          <div
            :class="{ open: open }"
            class="search">
            <input
              ref="search"
              v-model.trim="keyword"
              :maxlength="10"
              type="text"
              placeholder="search..."
              @keyup.enter="search"
            >
            <div
              class="eks"
              @click.stop="search"/>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { getScrollTop } from '~/utils/common'
import _ from '~/utils/underscore'

export default {
  name: 'Mheader',

  directives: {
    fix: {
      inserted(el) {
        let beforeScrollTop = getScrollTop()
        window.addEventListener(
          'scroll',
          _.throttle(() => {
            let afterScrollTop = getScrollTop()
            let delta = afterScrollTop - beforeScrollTop
            if (delta === 0) return false
            delta > 0 ? el.classList.add('fixed') : el.classList.remove('fixed')
            setTimeout(() => {
              beforeScrollTop = afterScrollTop
            }, 0)
          }, 200)
        )
      },
      unbind() {
        window.onscroll = null
      }
    }
  },

  data() {
    return {
      nav: [
        { path: '/code', name: '码农' },
        { path: '/think', name: '读书' },
        { path: '/funk', name: '民谣' }
      ],
      keyword: '',
      open: false
    }
  },

  watch: {
    open(val) {
      if (val) this.$refs.search.focus()
    }
  },

  methods: {
    hide() {
      this.open = false
    },

    search() {
      if (!this.open) {
        this.open = true
        return
      }
      this.$router.push(`/search/${this.keyword}`)
      this.open = false
      this.keyword = ''
    }
  }
}
</script>

<style lang="scss">
header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: $header-height;
  background: $white;
  transform: translateY(0);

  &:hover {
    background: $white;
  }

  &.fixed {
    transform: translateY(-100%);
  }

  &.darken {
    @include box-shadow(0, 1px, 2px, rgba(0, 0, 0, 0.05));
  }

  > .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: $container-width;
    height: $header-height;
    padding: 0 $lg-pad;
    line-height: $header-height;

    > .header-left {
      display: flex;

      > .logo {
        position: absolute;
        left: 50%;
        height: $header-height;
        line-height: $header-height;
        @include transform(translateX(-50%));

        a {
          color: $black;
          font-size: 2rem;

          img {
            vertical-align: text-bottom;
          }
        }
      }
    }
  }

  nav {
    > a {
      margin-right: 2.25rem;
      color: $disabled;

      > i {
        margin-right: 0.5rem;
      }

      &:hover {
        color: $black;
      }
    }

    > a.link-active {
      color: $black;
    }
  }

  .header-right {
    width: 200px;
  }

  .search-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.5rem;
    width: 100%;
    height: 40px;
    cursor: pointer;
    @include transform(translate3d(0, 0, 0));

    > .search {
      position: relative;
      width: 1rem;
      height: 1rem;
      border: 2px solid $dividers;
      @include transition(all 0.3s ease 0.15s);
      @include border-radius(0.9rem);
      cursor: pointer;

      &::after {
        top: 90%;
        left: 100%;
        width: 5px;
        height: 2px;
        background-color: $dividers;
        border-radius: 1px;
        @include def;
        @include transition(width 0.15s ease 0.45s);
        @include transform(rotate(45deg));
        @include transform-origin(top left);
      }

      > input {
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 14px;
        line-height: 38px;
        opacity: 0;
        background-color: transparent;
        color: $text;
        @include transition(opacity 0.15s ease);
      }

      > .eks {
        display: block;
        position: absolute;
        top: 50%;
        right: 2px;
        cursor: pointer;
        @include transform(translateY(-50%));

        &:before,
        &:after {
          @include def;
          right: 1px;
          height: 2px;
          width: 0px;
          border-radius: 1px;
          @include transition(all 0.25s ease);
        }

        &:before {
          top: 0px;
          background-color: $black;
          @include transform(rotate(-45deg));
          @include transform-origin(top right);
          @include transition-delay(0.1s);
        }

        &:after {
          bottom: 0px;
          background-color: $black;
          @include transform(rotate(45deg));
          @include transform-origin(bottom right);
          @include transition-delay(0s);
        }
      }
    }
  }

  .search.open {
    width: 100%;
    border: none;
    @include transition-delay(0.1s);

    &:after {
      width: 0px;
      @include transition-delay(0s);
    }

    > input {
      position: absolute;
      padding: 0.5rem 2.5rem 0.5rem 0.5rem;
      line-height: 1rem;
      // background: $light-dark;
      opacity: 1;
      @include transition-delay(0.05s);
    }

    > .eks {
      right: 10px;
      z-index: 20;
      width: 16px;
      height: 16px;

      &:before,
      &:after {
        width: 15px;
      }

      &:before {
        top: 2px;
        right: 0;
        @include transition-delay(0.25s);
      }

      &:after {
        right: 10px;
        bottom: 2px;
        width: 8px;
        @include transition-delay(0.3s);
      }
    }
  }
}
</style>
