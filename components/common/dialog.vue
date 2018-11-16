<template>
  <transition name="fade">
    <div
      v-show="dialogVisible"
      :class="{'dialog-mobile': mobileLayout}"
      class="dialog">
      <transition name="slide-down">
        <div
          v-click-outside="hide"
          v-show="dialogVisible"
          class="dialog-body">
          <div class="dialog-head">
            <a
              href="javascript:;"
              @click="hide">
              <i class="iconfont icon-close" />
            </a>
          </div>
          <div class="dialog-content">
            <slot />
            <img
              v-click-outside="hide"
              v-if="img"
              :src="img"
              alt=""
              @click="hide">
          </div>
          <div class="dialog-foot">
            <slot name="foot"/>
          </div>

        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'MDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      back: {
        height: '',
        overflow: ''
      }
    }
  },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    },

    dialogVisible() {
      if (this.visible) this.lockBody()
      else this.unlockBody()
      return this.visible
    }
  },
  methods: {
    hide() {
      this.$emit('update:visible', false)
    },

    lockBody() {
      if (typeof window === 'undefined') return
      this.back.height = document.body.style.height
      this.back.overflow = document.body.style.overflow
      document.body.style.height = '100%'
      document.body.style.overflow = 'hidden'
    },

    unlockBody() {
      if (typeof window === 'undefined') return
      document.body.style.height = this.back.height
      document.body.style.overflow = this.back.overflow
    }
  }
}
</script>
<style lang="scss">
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $secondary;
  z-index: 999;

  > .dialog-body {
    position: absolute;
    left: calc(50% - 17rem);
    top: 10rem;
    width: 34rem;
    padding: 1rem;
    background: $white;
    border-radius: 0.5rem;
    box-shadow: 0px 8px 46px rgba(0, 0, 0, 0.08),
      0px 2px 6px rgba(0, 0, 0, 0.03);

    > .dialog-head {
      text-align: right;

      .icon {
        font-size: 1.3rem;
      }
    }
  }

  &.dialog-mobile {
    > .dialog-body {
      width: 24rem;
      top: 4rem;
      left: calc(50% - 12rem);
    }
  }
}
</style>
