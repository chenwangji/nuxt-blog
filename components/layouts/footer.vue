<template>
  <footer :class="{ 'mobile': mobileLayout }">
    <div class="container center">
      <div class="friends clearfix">
        <a
          v-for="(friend, index) in friends"
          :key="index"
          :href="friend.url"
          target="_blank">
          {{ friend.name }}
          <span
            v-if="index !== friends.length - 1"
            class="hr" />
        </a>
      </div>
    </div>
    <div class="container center">
      <div class="mune">
        <nuxt-link to="/about">我</nuxt-link>
        <span class="hr" />
        <nuxt-link to="/wall">留言墙</nuxt-link>
        <span class="hr" />
        <nuxt-link to="/sitemap">归档</nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MyFooter',

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    },
    friends() {
      return this.$store.state.link.data.list
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  margin-top: $normal-pad;
  padding: $normal-pad 0;
  background: $white;
  border-top: 1px solid $border-color;
  color: $text;

  > .container {
    display: flex;
    justify-content: space-between;

    &.center {
      justify-content: center;
    }

    > .friends,
    > .mune {
      padding: $normal-pad / 2 0;
    }

    .mune {
      padding: $normal-pad / 2 $normal-pad;
      border-top: 1px solid $border-color;
    }
  }
  &.mobile {
    display: none;
    margin-top: 0;
    padding: 0 1rem;

    > .container {
      width: 100%;
    }
  }
}
</style>
