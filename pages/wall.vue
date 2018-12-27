<template>
  <div
    :class="{'walls-mobile': mobileLayout}"
    class="walls">
    <div class="head">
      <div class="box">
        <a
          href="javascript:;"
          class="join"
          @click.stop="open">我要上墙</a>
      </div>
    </div>

    <transition-group
      v-if="!mobileLayout"
      name="slide-down"
      tag="div"
      class="list-box">
      <hero-list
        key="1"
        :list="list0"/>
      <hero-list
        key="2"
        :list="list1"/>
      <hero-list
        key="3"
        :list="list2"/>
    </transition-group>

    <transition-group
      v-else
      name="slide-down"
      tag="div"
      class="list-box">
      <hero-list
        key="1"
        :list="items"/>
    </transition-group>

    <div
      v-if="haveMore"
      class="loading-more">
      <a
        v-if="!fetch"
        href="javascript:;"
        class="allow"
        @click="loadMore">加载更多</a>
      <a
        v-else
        href="javascript:;"
        class="not-allow">加载中</a>
    </div>

    <dialog-com
      :visible.sync="show"
      :class="{'dialog-mobile': mobileLayout}">
      <form>
        <div class="dialog-item name">
          <span>名字：</span>
          <input
            v-model="form.name"
            type="text"
            placeholder="称呼（非必填）"
            maxlength="20"
            class="form-item">
        </div>
        <div class="dialog-item content">
          <span>说点啥？</span>
          <textarea
            v-model="form.content"
            resize="none"
            placeholder="曾经有一个 BUG 摆在我的面前......（支持部分 markdown，必填）"
            maxlength="160"
            class="form-item"
            rows="4"/>
        </div>
      </form>
      <div
        slot="foot"
        class="footer">
        <button @click="show = false">取消</button>
        <button
          :disabled="posting"
          @click="submit">
          {{ posting ? '提交中...' : '确定' }}
        </button>
      </div>
    </dialog-com>
  </div>
</template>

<script>
import heroList from '~/components/common/heroList'
import dialogCom from '~/components/common/dialog'

export default {
  name: 'Wall',

  transition: 'fade',

  head: {
    title: 'Wall'
  },

  fetch({ store }) {
    return store.dispatch('getHeros')
  },

  components: {
    heroList,
    dialogCom
  },

  data() {
    return {
      show: false,

      form: {
        name: '',
        content: ''
      }
    }
  },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    },

    items() {
      return this.$store.state.heros.data.list
    },

    list0() {
      return this.items.filter((_, k) => k % 3 === 0)
    },

    list1() {
      return this.items.filter((_, k) => k % 3 === 1)
    },

    list2() {
      return this.items.filter((_, k) => k % 3 === 2)
    },

    fetch() {
      return this.$store.state.heros.fetch
    },

    haveMore() {
      const {
        current_page,
        total_page
      } = this.$store.state.heros.data.pagination
      return current_page !== total_page
    },

    posting() {
      return this.$store.state.heros.posting
    }
  },

  methods: {
    open() {
      this.form = { name: '', content: '' }
      this.show = true
    },

    async submit() {
      if (this.form.content === '') return alert('说点什么？')
      if (this.form.content.split('\n').length > 12) {
        return alert('内容须在12行以内')
      }
      const res = await this.$store.dispatch('postHero', { ...this.form })
      window.alert(res.message)
      if (res.code === 1) this.show = false
    },

    loadMore() {
      this.$store.dispatch('getHeros', {
        current_page: this.$store.state.heros.data.pagination.current_page + 1
      })
    }
  }
}
</script>

<style lang="scss">
.walls {
  &.walls-mobile {
    margin-bottom: 0;

    .head {
      height: 5rem;
    }

    > .list-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    > .loading-more {
      padding: 1rem;
    }
  }

  > .head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    width: 12rem;
    height: 5rem;
    font-size: 1.3rem;
    color: $black;
    text-align: center;
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    p {
      margin-bottom: 0.7rem;
    }

    .join {
      position: relative;
      padding: 0.5rem 1rem;
      color: $black;
      text-decoration: underline;
      border-radius: $xs-pad;
      transition: all 0.5s ease;
      transform: perspective(1px) translateZ(0);
      animation: defaultBtnBg 10s ease infinite alternate;

      &:hover {
        color: white;
      }
    }
  }

  .list-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  > .loading-more {
    margin-top: 1rem;
    padding: $md-pad;
    background: $module-bg;
    text-align: center;
    color: $black;

    &:hover {
      background: #9ea9b31f;
    }

    > .allow {
      cursor: pointer;
    }

    > .not-allow {
      cursor: not-allowed;
    }
  }
}

.dialog {
  .dialog-item {
    display: flex;
    margin: 0.8rem 1.5rem 1rem 0;

    > span {
      display: inline-block;
      height: 30px;
      width: 80px;
      line-height: 30px;
      text-align: right;
    }

    > .form-item {
      width: calc(100% - 80px);
      padding: 0.3rem 0.5rem;
      border: 1px solid $border-color;
      color: $black;
      border-radius: 4px;

      &:hover {
        border-color: $form-hover;
      }

      &:focus {
        border-color: $black;
      }
    }
  }

  .footer {
    text-align: right;

    > button {
      margin-right: 1.5rem;
    }
  }

  &.dialog-mobile {
    .dialog-body {
      top: 4rem;
    }

    .dialog-item {
      flex-wrap: wrap;
      width: 100%;
      margin: 0;
      padding: 0 1rem;

      > span {
        text-align: left;
      }

      > .form-item {
        width: 100%;
      }
    }

    .footer {
      margin-top: 1rem;
      padding-right: 1rem;

      > button {
        margin: 0 0 0 1.5rem;
      }
    }
  }
}

@keyframes defaultBtnBg {
  0% {
    color: white;
    background: rgb(179, 151, 217);
  }
  12% {
    color: white;
    background: rgb(128, 212, 224);
  }
  24% {
    color: white;
    background: rgb(242, 141, 160);
  }
  36% {
    color: white;
    background: rgb(97, 95, 245);
  }
  60% {
    color: white;
    background: rgb(133, 181, 240);
  }
  72% {
    color: white;
    background: rgb(229, 262, 110);
  }
  86% {
    color: white;
    background: rgb(148, 194, 165);
  }
  100% {
    color: white;
    background: rgb(123, 194, 172);
  }
}
</style>
