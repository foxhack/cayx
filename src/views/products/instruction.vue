<template>
  <transition name="slide">
  <div id="instruction-wrapper">
    <div class="top">
      <div class="go-back arrow-left" @click="close">
        &nbsp;&nbsp;返回
      </div>
      <div class="">{{title}}</div>
    </div>
    说明页组件
  </div>
  </transition>
</template>
<script>
  export default{
    name    : 'Instruction',
    props   : ['title'],
    methods : {
      close(){
        this.$emit('closeInstruction')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"
  #instruction-wrapper
    position fixed
    left 0
    top 0
    right 0
    min-height 100vh
    z-index 2000
    background-color #fff

    .top
      @extend .center
      position absoulte
      z-index 1
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

</style>
