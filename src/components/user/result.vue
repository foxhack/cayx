<template>
  <transition name="slide">
    <div id="result-wrapper">
      <div class="top center">
        <div>{{result.title}}</div>
      </div>
      <div class="result-icon el-icon-success"></div>
      <main class="content">
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
    name       : 'Result',
    props      : ['result'],
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
    z-index 2001
    background-color #fff
    padding-top calc(2.8em + 10px)

    .top
      position fixed
      font-family font-family-bold
      z-index 2001
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
      color secondary-text-color
      font-size 3.5em
      line-height 1.6
      margin-left 50%
      transform translateX(-50%)
    .content
      font-size x-large
      text-align center
</style>
