<template>
  <div
    id="comment-box"
    :class="{ mobile: mobileLayout }"
    class="comment-box">
    <div class="tools">
      <div class="total">
        <strong class="count">{{ comment.data.pagination.total || 0 }}</strong>
        <span>&nbsp;</span>
        <span>条评论</span>
      </div>
      <span class="line"/>
    </div>

    <form
      id="post-box"
      name="comment"
      class="post-box">
      <div class="editor-box">
        <div class="user">
          <div
            v-if="!mobileLayout"
            class="gravatar">
            <img
              :src="user.gravatar || '/img/user.png'"
              :alt="user.name || '匿名用户'">
          </div>
        </div>
        <div class="editor">
          <transition-group
            key="1"
            tag="div">
            <div
              v-if="!!pid"
              key="1"
              class="will-reply">
              <div class="reply-user">
                <span>
                  <span>回复 </span>
                  <a
                    href="">
                    <strong>{{ 'mock' }}</strong>
                  </a>
                </span>
                <a
                  class="cancel iconfont icon-cancel"
                  href=""/>
              </div>
              <div class="reply-preview">
                mock
              </div>
            </div>
            <div
              key="2"
              class="markdown">
              <div
                ref="markdown"
                contenteditable
                placeholder="写下你的评论..."
                class="markdown-editor"
                @keyup="commentContentChange"/>
            </div>

            <div
              key="3"
              class="editor-tools">
              <a
                href=""
                class="emoji"
                title="emoji"
                @click.stop.prevent>
                <i class="iconfont icon-emoji"/>
                <transition name="fade">
                  <div class="emoji-box">
                    <ul class="emoji-list">
                      <li
                        class="item"
                        @click="insertEmoji('😃')">😃</li>
                      <li
                        class="item"
                        @click="insertEmoji('😂')">😂</li>
                      <li
                        class="item"
                        @click="insertEmoji('😅')">😅</li>
                      <li
                        class="item"
                        @click="insertEmoji('😉')">😉</li>
                      <li
                        class="item"
                        @click="insertEmoji('😌')">😌</li>
                      <li
                        class="item"
                        @click="insertEmoji('😔')">😔</li>
                      <li
                        class="item"
                        @click="insertEmoji('😓')">😓</li>
                      <li
                        class="item"
                        @click="insertEmoji('😘')">😘</li>
                      <li
                        class="item"
                        @click="insertEmoji('😡')">😡</li>
                      <li
                        class="item"
                        @click="insertEmoji('😭')">😭</li>
                      <li
                        class="item"
                        @click="insertEmoji('😱')">😱</li>
                      <li
                        class="item"
                        @click="insertEmoji('😳')">😳</li>
                      <li
                        class="item"
                        @click="insertEmoji('😵')">😵</li>
                      <li
                        class="item"
                        @click="insertEmoji('🌚')">🌚</li>
                      <li
                        class="item"
                        @click="insertEmoji('👍')">👍</li>
                      <li
                        class="item"
                        @click="insertEmoji('👎')">👎</li>
                      <li
                        class="item"
                        @click="insertEmoji('💪')">💪</li>
                      <li
                        class="item"
                        @click="insertEmoji('🌹')">🌹</li>
                      <li
                        class="item"
                        @click="insertEmoji('💊')">💊</li>
                      <li
                        class="item"
                        @click="insertEmoji('🇨🇳')">🇨🇳</li>
                      <li
                        class="item"
                        @click="insertEmoji('🇺🇸')">🇺🇸</li>
                    </ul>
                  </div>
                </transition>
              </a>
              <a
                href=""
                class="image"
                title="image"
                @click.stop.prevent="insertContent('image')">
                <i class="iconfont icon-image"/>
              </a>
              <a
                href=""
                class="link"
                title="link"
                @click.stop.prevent="insertContent('link')">
                <i class="iconfont icon-link"/>
              </a>
              <a
                href=""
                class="code"
                title="code"
                @click.stop.prevent="insertContent('code')">
                <i class="iconfont icon-code"/>
              </a>
              <button
                type="submit"
                class="submit"
                @click="submitComment($event)">
                <span>{{ comment.posting ? '发布中...' : '发 布' }}</span>
                <i class="iconfont icon-release"/>
              </button>
            </div>
          </transition-group>
        </div>
      </div>

      <transition
        name="module"
        mode="out-in">
        <div
          v-if="!userCacheMode || userCacheEditing"
          class="user">
          <div class="name">
            <input
              v-model="user.name"
              required
              type="text"
              name="name"
              placeholder="称呼（必填）"
              maxlength="10">
          </div>
          <div class="email">
            <input
              v-model="user.email"
              required
              type="email"
              name="email"
              placeholder="邮箱（必填，不会公开）"
              maxlength="40">
          </div>
          <div class="site">
            <input
              v-model="user.site"
              required
              type="url"
              name="url"
              placeholder="网站（http, https:// 开头，非必填）"
              maxlength="40">
          </div>
          <div
            v-if="userCacheEditing"
            class="save">
            <button
              type="submit"
              @click="updateUserCache($event)">
              <i class="iconfont icon-success"/>
            </button>
          </div>
        </div>

        <div
          v-if="userCacheMode && !userCacheEditing"
          class="user">
          <div class="edit">
            <strong class="name">{{ user.name }}</strong>
            <a
              href=""
              class="setting"
              @click.stop.prevent>
              <i class="iconfont icon-setting"/>
              <span>账户设置</span>
              <ul class="user-tool">
                <li @click.stop.prevent="userCacheEditing = true">编辑信息</li>
                <li @click.stop.prevent="clearUserCache">清空信息</li>
              </ul>
            </a>
          </div>
        </div>
      </transition>
    </form>

    <transition-group
      name="list"
      tag="span">
      <div
        v-if="comment.data.data.length"
        key="1"
        class="list-box">
        <transition-group
          name="list"
          tag="ul"
          class="comment-list">
          <li
            v-for="comment in comment.data.data"
            :id="`comment-item-${comment.id}`"
            :key="comment.id"
            class="comment-item">
            <div
              v-if="!mobileLayout"
              class="cm-avatar">
              <a
                ref="external notfollow"
                :href="comment.author.site"
                target="_blank"
                @click.stop="clickUser($event, comment.author)">
                <img
                  :src="'/img/user.png'"
                  :alt="comment.author.name || '匿名用户'">
              </a>
            </div>
            <div class="cm-body">
              <div class="cm-header">
                <a
                  ref="external nofollow"
                  :href="comment.author.site"
                  class="user-name"
                  @click.stop="clickUser($event, comment.author)">
                  <img
                    v-if="mobileLayout"
                    :src="'/img/user.png'"
                    :alt="comment.author.name || '匿名用户'"
                    width="24px"
                    style="margin-right: 10px">
                  <span>{{ comment.author.name }}</span>
                </a>
                <span class="flool">{{ comment.create_at | dateFormat('yyyy.MM.dd hh:mm') }}</span>
              </div>
              <div class="cm-content">
                <div v-html="marked(comment.content)"/>
              </div>
              <div class="cm-footer">footer</div>
            </div>
          </li>
        </transition-group>
      </div>
    </transition-group>
  </div>
</template>

<script>
import marked from '~/plugins/marked'

export default {
  name: 'Comment',

  props: {
    postId: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      // 父级评论
      pid: 0,
      // 编辑器相关
      commentContentHtml: '',
      commentContentText: '',
      // 用户相关
      userCacheMode: false,
      userCacheEditing: false,
      user: {
        name: '望基',
        email: '',
        site: '',
        gravatar: null
      },
      // 用户历史数据
      likeComments: [],
      regexs: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
        url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
      }
    }
  },

  computed: {
    comment() {
      return this.$store.state.comment
    },

    replayCommentSelf() {
      return this.comment.data.data.find(comment => {
        return Object.is(comment.id, this.pid)
      })
    },

    mobileLayout() {
      return this.$store.state.options.mobileLayout
    }
  },

  mounted() {
    this.initUser()
    this.loadCommentList()
  },

  methods: {
    // markdown 解析
    marked(content) {
      return marked(content, null, false).html
    },
    // 编辑器先关
    // 编辑器内容同步
    commentContentChange() {
      const html = this.$refs.markdown.innerHTML
      const text = this.$refs.markdown.innerText
      if (!Object.is(html, this.commentContentHtml)) {
        this.commentContentHtml = html
      }
      if (!Object.is(text, this.commentContentText)) {
        this.commentContentText = text
      }
    },
    updateCommentContent({ start = '', end = '' }) {
      if (!start && !end) return false
      // 如果选中了内容，则把选中的内容替换，否则在光标位置插入新内容
      const selectedText = (window.getSelection ||
        document.getSelection)().toString()
      const currentText = this.$refs.markdown.innerText
      if (!!selectedText) {
        const newText = currentText.replace(
          selectedText,
          start + selectedText + end
        )
        this.$refs.markdown.innerText = newText
      } else {
        this.$refs.markdown.innerText = this.$refs.markdown.innerText +=
          start + end
        this.$refs.markdown.scrollTop = this.$refs.markdown.scrollHeight
      }
      this.commentContentChange()
    },
    insertEmoji(emoji) {
      this.updateCommentContent({ end: emoji })
    },
    insertContent(type) {
      const contents = {
        image: {
          start: '![',
          end: ']()'
        },
        link: {
          start: '[',
          end: ']()'
        },
        code: {
          start: '\n```javascript\n',
          end: '\n```'
        }
      }
      this.updateCommentContent(contents[type])
    },

    clearCommentContent() {
      this.commentContentHtml = ''
      this.$refs.markdown.innerHTML = this.commentContentHtml
      this.commentContentChange()
    },

    // 初始化本地用户和本地用户的点赞记录
    initUser() {
      if (localStorage) {
        const user = localStorage.getItem('BLOG_USER')
        const likeComments = localStorage.getItem('LIKE_COMMENTS')
        if (likeComments) this.likeComments = JSON.parse(likeComments)
        if (user) {
          this.user = JSON.parse(user)
          this.userCacheMode = true
        }
      }
    },
    // 更新用户数据
    validUserInfo() {
      if (!this.user.name) {
        alert('名字？')
        return false
      }
      if (!this.user.email) {
        alert('邮箱？')
        return false
      }
      if (!this.regexs.email.test(this.user.email)) {
        alert('邮箱不合法')
        return false
      }
      if (this.user.site && !this.regexs.url.test(this.user.site)) {
        alert('链接不合法')
        return false
      }
      return true
    },
    // 更新用户数据
    updateUserCache(e) {
      event.preventDefault()
      if (!this.validUserInfo()) return
      localStorage.setItem('BLOG_USER', JSON.stringify(this.user))
      this.userCacheEditing = false
    },
    // 清空用户数据
    clearUserCache() {
      this.userCacheMode = false
      this.userCacheEditing = false
      localStorage.removeItem('BLOG_USER')
      Object.keys(this.user).forEach(key => (this.user[key] = ''))
    },

    // 点击用户头像
    clickUser(e, author) {},

    // 获取评论列表
    async loadCommentList(params = {}) {
      const res = await this.$store.dispatch('loadCommentsByPostId', {
        ...params,
        post_id: this.postId
      })
    },

    // 提交评论
    async submitComment(e) {
      e.preventDefault()
      if (!this.validUserInfo()) return
      if (
        !this.commentContentText ||
        !this.commentContentText.replace(/\s/g, '')
      ) {
        return alert('内容？')
      }
      const lineOverfolw = this.commentContentText.split('\n').length > 36
      const lengthOverflow = this.commentContentText.length > 1000
      if (lineOverfolw || lengthOverflow) {
        return alert('评论内容需在1000字/36行内')
      }
      if (!this.user.site) delete this.user.site
      const res = await this.$store.dispatch('postComment', {
        pid: this.pid,
        post_id: this.postId,
        content: this.commentContentText,
        author: this.user
      })

      if (res.code === 1) {
        this.userCacheMode = true
        this.clearCommentContent()
        localStorage.setItem('BLOG_USER', JSON.stringify(this.user))
      } else alert('操作失败')
    }
  }
}
</script>

<style lang="scss">
.cm-content,
.reply-preview {
  font-size: 1em;
  line-height: 2em;
  margin: 0.8em 0;
  word-wrap: break-word;

  a {
    text-decoration: underline;
  }

  img {
    margin: 0.5rem 0;
    max-width: 100%;
    border-radius: 2px;
  }

  p {
    margin: 0;
  }

  code {
    color: #bd4147;
    padding: 0.3em 0.5em;
    margin: 0 0.5em;
    border-radius: $radius;
    background-color: $module-hover-bg;
  }

  pre {
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: $code-bg;
    border-radius: 3px;
    width: 100%;

    > code {
      margin: 0;
      padding: 1em;
      float: left;
      width: 100%;
      height: 100%;
      display: block;
      line-height: 1.6em;
      background-color: transparent;
    }
  }
}

#comment-box {
  position: relative;
  padding: 1rem 0;
  margin-top: 1rem;

  &.mobile {
    .list-box {
      > .comment-list {
        > .comment-item {
          padding: 0.4rem 0;

          > .cm-body {
            padding: 0.6em 0;

            > .cm-content {
              .reply-name {
                margin-bottom: 0.3rem !important;
              }
            }

            > .cm-footer {
              > .reply {
                display: block !important;
              }
            }
          }
        }
      }
    }

    .loading {
      height: 5rem;
      line-height: 5rem;
    }

    > .post-box {
      > .user {
        padding: 0;
        height: auto;
        flex-direction: column;
        position: relative;

        > .name,
        > .email,
        > .site,
        > .save {
          width: 80%;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 1rem;
        }

        > .save {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10%;
          height: 2rem;
          border: 1px solid $border-color;
        }
      }

      > .editor-box {
        .editor {
          max-width: 100%;
        }

        .user {
          margin: 0;
        }
        .emoji-box {
          width: 200px !important;
        }
      }
      .user-tool {
        background: transparent !important;
        li {
          padding: 0 !important;
        }
      }
    }
  }

  > .tools {
    position: relative;
    display: flex;
    padding: 1em 0;
    padding-top: 0;
    align-items: center;
    justify-content: space-between;

    > .total {
      position: relative;
      padding-right: $lg-pad;
      color: $black;
      background: $white;
      font-weight: 500;
      z-index: 99;
    }

    > .sort {
      > .sort-btn {
        margin-left: 1em;

        &.actived {
          color: $black;
          font-weight: bold;
        }
      }
    }
  }

  // > .empty-box,
  .loading {
    font-weight: bold;
    text-align: center;
    height: 7rem;
    line-height: 7rem;
  }

  .list-box {
    margin-top: 1rem;

    > .comment-list {
      padding: 0;
      margin: 0;
      list-style-type: none;

      > .comment-item {
        position: relative;
        padding: 0.6em 0 0.6em 3.6em;

        &:last-child {
          border: 0;
        }

        > .cm-avatar {
          display: block;
          position: absolute;
          left: 0;
          top: 1.2rem;

          > a {
            display: block;
            width: $gravatar;
            height: $gravatar;

            > img {
              width: 100%;
              height: 100%;
              transition: transform 0.5s ease-out;
              border-radius: $radius;
            }
          }
        }

        > .cm-body {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0.5rem;

          > .cm-header {
            display: flex;
            justify-content: space-between;
            position: relative;

            > .user-name {
              color: $secondary;
              font-weight: bold;
              font-size: $font-size-small;
              margin-right: 0.3rem;
              font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;

              img {
                border-radius: $radius;
                margin-right: 0.2rem;
              }

              &:hover {
                text-decoration: underline;
              }
            }

            // >.reply {
            //   a {
            //     font-weight: bold;
            //     margin-left: .3rem;
            //   }
            // }

            > .flool {
              color: $disabled;
              font-size: $font-size-small;
              font-family: Arial;
              display: inline-block;
            }
          }

          > .cm-content {
            font-size: 1rem;
            color: $black;

            > .reply-box {
              padding: 0.8rem;
              margin-bottom: 0.8rem;
              border: 1px solid $border-color;
              border-radius: 4px;

              > .reply-name {
                color: $secondary;
                font-weight: bold;
                font-size: $font-size-small;
                margin-bottom: 0.5rem;
                font-family: Microsoft YaHei, Arial, Helvetica, sans-seri;

                a {
                  text-decoration: none;

                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
          }

          > .cm-footer {
            display: flex;
            align-items: center;
            position: relative;

            > .reply,
            > .like {
              font-size: 0.8em;
              margin-right: 1em;
            }

            > .reply,
            > .like {
              opacity: 0.8;

              &:hover {
                color: $red;
              }

              &.liked {
                color: $red;
                font-weight: bold;
              }

              > .iconfont {
                opacity: 0.8;
                margin-right: 0.2em;
              }
            }

            > .reply {
              display: none;

              &:hover {
                color: $green;
              }
            }
          }
        }
        &:hover {
          .cm-body > .cm-footer > .reply {
            display: block;
          }
        }
      }
    }
  }

  > .pagination-box {
    margin: 0.5rem;

    > .pagination-list {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      list-style-type: none;

      > .item {
        margin: 0 0.5em;

        > .pagination-btn {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          display: inline-block;
          line-height: 2rem;
          text-align: center;

          &.prev,
          &.next {
            width: 5em;
            font-size: 0.9em;
          }

          &.disabled {
            cursor: no-drop;
            opacity: 0.5;
          }
        }
      }
    }
  }

  > .post-box {
    display: block;
    // border-bottom: 1px solid $border-color;
    padding-top: 1rem;

    > .user {
      display: flex;
      padding-left: 4rem;
      margin-top: 0.3rem;
      width: 100%;
      height: 2em;
      line-height: 2em;

      > .edit {
        flex-grow: 1;
        text-align: right;
        line-height: 2em;
        position: relative;

        > .name {
          font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;
        }

        > .setting {
          margin-left: 1rem;
          font-size: 1rem;
          display: inline-block;

          &:hover {
            > .user-tool {
              display: block;
            }
          }

          > .iconfont {
            margin-right: 0.5rem;
          }

          > .user-tool {
            display: none;
            position: absolute;
            right: 0;
            top: 2em;
            margin: 0;
            padding: 0;
            padding-top: 0.5rem;
            list-style-type: square;
            background: $white;
            z-index: 99;

            li {
              padding: 0 1rem;

              &:hover {
                background: rgba(0, 0, 0, 0.12);
              }
            }
          }
        }
      }

      > .save {
        width: 10%;
        margin-left: 1em;
        flex-grow: 1;
        line-height: 2em;
        text-align: center;
        font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;

        > button {
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          color: $green;
        }
      }

      > .name,
      > .email,
      > .site {
        font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;
        flex-grow: 1;

        > input {
          width: 100%;
          height: 2em;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid $border-color;
          border-radius: 4px;

          &:hover {
            border-color: $form-hover;
          }

          &:focus {
            border-color: $black;
          }
        }
      }

      > .name,
      > .email {
        margin-right: 1em;
      }
    }

    > .editor-box {
      width: 100%;
      display: flex;

      > .user {
        margin-right: 1em;

        > .gravatar {
          display: block;
          margin-bottom: 0.5em;
          width: $gravatar;
          height: $gravatar;

          > img {
            width: 100%;
            height: 100%;
            transition: transform 0.5s ease-out;
            border-radius: 4px;
          }
        }
      }

      > .editor {
        flex-grow: 1;
        position: relative;
        max-width: calc(100% - 56px);

        .will-reply {
          font-size: 0.95em;
          margin-bottom: 1em;

          > .reply-user {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding: 0 1rem;
            height: 2.6em;
            line-height: 2.6em;
            border: 1px solid $border-color;
            border-radius: 4px;

            .cancel {
              &:hover {
                color: $red;
              }
            }
          }

          > .reply-preview {
            max-height: 10em;
            overflow: auto;
            padding: 1rem;
            border: 1px solid $border-color;
            border-radius: 4px;
          }
        }

        .markdown {
          position: relative;
          overflow: hidden;

          > .markdown-editor {
            min-height: 6em;
            max-height: 30em;
            overflow: auto;
            outline: none;
            padding: 0.5em;
            cursor: auto;
            font-size: 0.95em;
            line-height: 1.8em;
            border: 1px solid $border-color;
            border-radius: 4px;

            &:hover {
              border-color: $form-hover;
            }

            &:focus {
              border-color: $black;
            }

            &:empty:before {
              content: attr(placeholder);
              color: $disabled;
            }

            &:focus {
              content: none;
            }
          }
        }

        .editor-tools {
          height: 2rem;
          line-height: 2rem;
          margin-top: 0.4rem;

          > .emoji {
            > .emoji-box {
              display: none;
              position: absolute;
              bottom: -7em;
              left: 0;
              width: 250px;
              padding: 0.5rem;
              background-color: $white;
              z-index: 999;

              > .emoji-list {
                list-style: none;
                padding: 0;
                margin: 0;
                font-size: 1.3em;
                display: flex;
                flex-wrap: wrap;

                > .item {
                  padding: 0 0.4em;
                  cursor: pointer;

                  &:hover {
                    background: rgba(0, 0, 0, 0.12);
                  }
                }
              }
            }

            &:hover {
              > .emoji-box {
                display: block;
              }
            }
          }

          > .emoji,
          > .image,
          > .link,
          > .code,
          > .preview {
            width: 2em;
            height: 2em;
            text-align: center;
            display: inline-block;

            &:hover {
              background: rgba(0, 0, 0, 0.12);
            }
          }

          > .submit {
            float: right;
            border: 0;
            padding: 0 0.5rem;

            span {
              margin-right: 0.5rem;
            }

            &:hover {
              background: rgba(0, 0, 0, 0.12);
            }
          }
        }
      }
    }
  }
}
</style>
