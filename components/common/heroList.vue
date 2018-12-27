<template>
  <div
    :class="{ mobile: mobileLayout }"
    class="column">
    <div
      v-for="item in list"
      :key="item._id"
      class="list">
      <h3 class="user">
        <span class="user-name">
          {{ item.create_time | dateFormat('yyyy.MM.dd hh:mm') }}
        </span>
      </h3>
      <div
        class="content markdown-content"
        v-html="marked(item.content)"/>
      <div class="info">
        <span class="time">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import markdown from '~/plugins/marked'

export default {
  name: 'HeroList',

  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    }
  },

  methods: {
    marked(content) {
      return markdown(content, null, false).html
    }
  }
}
</script>

<style lang="scss">
.column {
  display: flex;
  flex-direction: column;
  width: calc(100% / 3 - 2rem / 3);

  > .list {
    position: relative;
    left: 0;
    top: 0;
    padding: $normal-pad;
    min-height: 13rem;
    margin-bottom: 1rem;
    color: $black;
    background: $code-bg;
    transition: all 0.3s;

    &:hover {
      box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.2);
      transform: translate(-4px, -4px);
    }

    > .user {
      > .user-name {
        max-width: 20rem;
        font-weight: normal;
        font-size: 1rem;

        @include text-overflow();
      }
    }

    > .content {
      margin: 1rem 0;
      min-height: 6rem;
      max-height: 20rem;
      font-size: 0.85rem;
      word-break: break-all;
      overflow: hidden;
    }

    > .info {
      height: 1rem;
      font-size: $font-size-small;
      line-height: 1rem;
      text-align: right;
    }
  }

  &.mobile {
    margin-right: 0;
    width: 100%;
  }
}
</style>
