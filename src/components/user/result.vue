<template>
  <transition name="slide">
    <div id="result-wrapper">
      <div class="top center">
        <div>{{result.title}}</div>
      </div>
      <div v-if="result.type=='success'" class="result-icon el-icon-success"></div>
      <div v-if="result.type=='error'" class="result-icon el-icon-error"></div>
      <div v-if="result.type=='processing'" class="result-icon el-icon-more"></div>
      <main class="content" :class="{'content-error':result.type=='error','content-processing':result.type=='processing'}">
        {{result.content}}
      </main>
      <footer class="dialog-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </transition>
</template>
<script>
  export default{
    data(){
      return {}
    },
    name  : 'Result',
    props : ['result'],
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"
  #result-wrapper
    position fixed
    left 0
    top 0
    right 0
    min-height 100vh
    z-index 2000
    background-color #fff
    padding-top calc(2.8em + 10px)

    .top
      position absolute
      font-family font-family-bold
      z-index 1
      left 0
      top 0
      right 0
      height 2.8em
      background-color secondary-text-color
      color white

    .go-back
      position absolute
      left 10px
    .result-icon
      font-size 3.5em
      line-height 1.6
      margin-left 50%
      transform translateX(-50%)
    .content
      font-size x-large
      text-align center
      margin-bottom 1em
    .content.content-error, .result-icon.el-icon-error
      color error-color
    .content.content-processing, .result-icon.el-icon-error
      color error-color
    .result-icon.el-icon-success
      color secondary-text-color
</style>
