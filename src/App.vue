<template>
  <div id="app">
    <navigation-bar key="navigation" :title="title" :showBack="showBack" v-if="showBack"></navigation-bar>
    <transition :name="transitionName">
      <router-view key="comp"></router-view>
    </transition>
    <main-menu key="menu" v-if="!showBack"></main-menu>
  </div>
</template>

<script>
  import NavigationBar from '@/components/navigationBar'
  import Menu from '@/components/menu'
  export default {
    name       : 'App',
    data(){
      return {
        transitionName : '',
        showBack       : false
      }
    },
    computed   : {
      title(){
        return this.$store.state.title
      }
    },
    components : { 'main-menu' : Menu, NavigationBar },
    watch      : {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        this.showBack = !(this.$route.path=='/product' || this.$route.path=='/product/' || this.$route.path=='/user' || this.$route.path=='/user/')
      }
    },
    created(){
      console.log('组件APP')
    }
  }
</script>

<style lang="stylus">
  @import "./style/base"
  html
    background #f5f5f5

  body
    background #f5f5f5
    min-height 100vh
    font-family pingfang-regular
    color primary-text-color
    line-height 1.6
    overflow-x hidden
    font-weight 500

  @media screen and (max-width: 321px) {
    body {
      font-size: 17px
    }
  }

  @media screen and (min-width: 321px) and (max-width: 400px) {
    body {
      font-size: 18px;
    }
  }

  @media screen and (min-width: 400px) {
    body {
      font-size: 20px
    }
  }

  input
    appearance none
    border-radius 0
    border 0
    outline 0
    font-size inherit
    width 100%

  input[type="button"]
    border none

  input[type="button"]:disabled
    background neutral-text-color4
    border neutral-text-color4

  .icon
    width 1em
    height 1em
    vertical-align -0.15em
    fill currentColor
    overflow hidden

  .slide-left-enter, .slide-enter
    transform translateX(100%)

  .slide-left-enter-to, .slide-enter-to
    transition transform 0.3s
    transform translateX(0)

  .slide-leave-to
    transform translateX(100%)
    transition transform 0.3s

  .slide-leave
    transform translateX(0)

  .slide-right-enter
    transform translateX(-100%)

  .slide-right-enter-to
    transition transform 0.3s
    transform translateX(0)

  .flex
    display flex

  .flex-row, .flex-col
    @extend .flex

  .flex-row
    flex-direction row

  .flex-col
    flex-direction column

  .center
    display flex
    justify-content center
    align-items center

  .arrow-right::after
    border solid 2px
    border-bottom-width 0
    border-left-width 0
    content: " "
    top 50%
    right 2px
    position absolute
    width 8px
    height 8px
    transform: translateY(-50%) rotate(45deg)

  .arrow-left::before
    border solid 2px
    border-top-width 0
    border-right-width 0
    content: " "
    top 50%
    left 2px
    position absolute
    width 8px
    height 8px
    transform: translateY(-50%) rotate(45deg)

  .hr-line::before
    content ''
    position absolute
    left 0
    right 0
    top 0
    border-top 1px solid gray

  .hr-line::after
    content ''
    position absolute
    left 0
    right 0
    bottom 0
    border-top 1px solid gray

  @media (-webkit-min-device-pixel-ratio: 2)
    .hr-line::after, .hr-line::before
      transform-origin 0 0
      transform scaleY(0.5)

  .top-line::before
    @extend .hr-line::before

  .bottom-line::after
    @extend .hr-line::after

  /*section:not(:last-child)*/
  /*margin-bottom 1em*/

  section
    margin-bottom 1em

  section
    .title, .tip
      padding 5px 10px
    .title
      background white
      font-family font-family-bold
      color striking-text-color
      font-size extra-small

    .tip
      {second-level}
      text-align right
      color info-color
      font-size extra-extra-small

  .fix-bottom
    position fixed
    left 0
    right 0
    top calc(100vh - 2.64em - 20px)
    z-index 2000

  input[type="button"].nofix-button
    width calc(100% - 20px)
    margin 10px auto
    border-radius 10px

  .miss
    @extend .center
    background #BBB
    color #fff
    line-height 5em
    font-size 3em

  .primary-btn
    @extend .center
    background secondary-text-color
    color #fff
    line-height 2.2em
    font-size 1.2em
    width calc(100% - 20px)
    margin 10px
    border-radius 4px

  .primary-btn.plain
    @extend .center
    background white
    color secondary-text-color
    border 1px solid
    line-height 2.2em
    font-size 1.2em

  .cell
    @extend .flex-row
    color primary-text-color
    background-color white
    justify-content space-between
    align-items center
    line-height 3em
    padding 0 0.2rem
    margin-bottom 10px
    position relative

  .cell::after
    @extend .bottom-line::after
    border-top-color secondary-text-color

  .mint-indicator-wrapper
    z-index 3001

  .mint-indicator-mask
    z-index 3000

  .mint-field-state.is-success
    color success-color

  .mint-field-core
    {third-level}

  .mint-radio-input:checked + .mint-radio-core
    background secondary-text-color
    border-color secondary-text-color

  .mint-toast.popup-top
    min-width 100%
    top 0px
    border-radius 0px
    color white
    font-size medium
    box-shadow 0 2px 10px rgba(0, 0, 0, 0.2)

  #product-detail-wrapper, #bind-account, #account-operate, #transaction
    .dialog-wrapper > div
      width 90%
      border-radius 0.5em

  #product-detail-wrapper, #bind-account, #account-operate, #transaction
    .el-dialog__header
      border-top-left-radius 0.5em
      border-top-right-radius 0.5em


  #transaction-input, #transaction-password-setting
    .el-dialog__wrapper .el-dialog__header
      border-top-left-radius 0em
      border-top-right-radius 0em
      font-size large
      font-family pingfang-bold

    .el-dialog__body
      color inherit
      padding 0 !important
      font-size 1em

  #open-account
    .el-dialog
      margin-bottom 0
      width 100%

  .el-dialog__header
    position relative
    background-color secondary-text-color

  .el-dialog__title
    color white

  .el-loading-mask
    height 100vh !important
    width 100vw !important
    top 0 !important
    left 0 !important

  .el-message
    min-width: 100%

  .el-notification.right
    right 10px

  .el-notification, .el-message-box
    width 90%

  /*#app*/
  /*min-height 100vh*/
  /*padding-bottom menuHeight*/

  .page-with-top-bottom
    min-height 100vh
    padding-top navHeight
    padding-bottom 4em

  .page-with-top
    min-height 100vh
    padding-top navHeight

  .page-with-menu
    min-height 100vh
    padding-bottom menuHeight

  .mint-cell
    min-height 54px

  .mint-cell-wrapper
    font-size 1em

  .mint-cell-label
    font-size extra-extra-small

  .no-top-line .mint-cell-wrapper
    background none

  #user-home .mint-cell-label
    margin-left calc(1.8em + 10px)

  .error
    position absolute
    z-index 2000
    right 10px
    bottom -20px
    background-color error-color
    color white
    text-align right
    padding 4px 10px
    border-radius 4px
    font-size 0.8em

  .error:after
    position absolute
    content ''
    border 6px solid transparent
    border-bottom 6px solid error-color
    top -11px
    right 3px


  .mint-spinner-fading-circle
    margin 10px auto

  .money-input
    .mint-cell-title
      width auto
    .mint-cell-text
      font-size 2em
      color secondary-text-color
    input
      color secondary-text-color
   .money-input.active
     input
      font-size 1.7em

  #name-input, #idno-input, #email-input, #telephone-input, #address-input, #identify-code, #bankcard-input
    position relative
    input, textarea
      margin-right 20px
      text-align right
      color neutral-text-color3
    .mint-field-state
      position absolute
      right 10px

  #new-password, #update-password
    .mint-field-core
      -webkit-text-security disc
      text-security disc

  .mint-toast-icon
    font-size 2em

  .all
    color striking-text-color
    font-size small

  .add-bank
    width 90%
    color silver
    margin 0.5em auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em

  .d-msg
    color striking-text-color
  .d-sub-msg
    font-family font-family-bold
    font-size extra-extra-large
    margin-top 1em
    text-align center
    color primary-text-color

  b
    color primary-text-color

  .el-icon-info
    margin-right 4px

  .picker-item.picker-selected
    color primary-text-color

  .mint-datetime .picker-toolbar, .area-picker .picker-toolbar
    background-color striking-text-color
    border-bottom none
    span
      color white

  /*与mint-ui datepicker的toolbar保持一致*/
  .area-picker .picker-toolbar
    display flex
    span
      flex 1
      line-height 40px
      text-align center
      font-size 16px


</style>
