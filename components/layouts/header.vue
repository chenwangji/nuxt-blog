<template>
  <header class="darken">
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
    </div>
  </header>
</template>

<script>
export default {
  name: 'Mheader',
  data() {
    return {
      nav: [
        { path: '/code', name: '码农' },
        { path: '/think', name: '读书' },
        { path: '/funk', name: '民谣' }
      ]
    }
  }
}
</script>

<style lang="scss">
header {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: $header-height;
  background: $white;
  @include transform(translateY(0));

  &:hover {
    background: $white;
  }

  &.fixed {
    @include transform(translateY(-100%));
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
      color: $green;
    }

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
</style>
