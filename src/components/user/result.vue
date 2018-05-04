<template>
  <transition name="slide">
    <div id="result-wrapper">
      <div class="top">
        <div class="">{{result.title}}</div>
      </div>
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
    methods    : {}
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
      @extend .center
      position fixed
      z-index 2001
      left 0
      top 0
      right 0
      height 2.8em
      background-color #fff

    .top:after
      @extend .hr-line

    .go-back
      position absolute
      left 10px

    .content
      font-size x-large
      text-align center
</style>
