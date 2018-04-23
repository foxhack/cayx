<template>
  <div id="app">
    <transition :name="transitionName">
      <div>
        <navigation-bar :title="title" :showBack="showBack"></navigation-bar>
        <router-view class="page"></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
  import NavigationBar from '@/components/navigationBar'
  export default {
    name       : 'App',
    data(){
      return {
        transitionName : ''
      }
    },
    computed:{
      title(){
        return this.$store.state.title
      },
      showBack(){
        return !(this.$route.path =='/product' || this.$route.path=='/user')
      }
    },
    components : { NavigationBar },
    watch      : {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    created(){
      console.log('组件APP')

      document.querySelector('#logo').style.display = 'none'
    }
  }
</script>

<style lang="stylus">
  @import "./style/base"
  body
    background #f5f5f5
    min-height 100vh
    font-family font-family-regular
    color primary-text-color
    line-height 1.6
    overflow-x hidden
    font-weight 500

  @media screen and (max-width: 321px) {
    body {
      font-size: 15px
    }
  }

  @media screen and (min-width: 321px) and (max-width: 400px) {
    body {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 400px) {
    body {
      font-size: 18px
    }
  }

  #app
    min-height 100vh
    padding-top 2.4em
    padding-bottom 3em

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

  .dialog-wrapper > div
    width 90%
    border-radius 0.5em

  .el-dialog__header
    position relative

  .el-dialog__header:after
    @extend .hr-line
    border-color neutral-border-color2

  .el-loading-mask
    height 100vh !important
    width 100vw !important
    top 0 !important
    left 0 !important

  .el-message
    min-width: 100%
</style>
