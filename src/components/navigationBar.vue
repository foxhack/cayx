<template>
  <div class="top-wrapper">
    <div class="go-back" v-if="showBack" @click="goback()"><返回</div>
    <div class="nav">{{title}}</div>
  </div>
</template>
<script>
  export default{
    props : ['title','showBack'],
    methods:{
      goback(){
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../style/base.styl'
  .top-wrapper
    @extend .center
    z-index 3000
    height 2.4em
    position fixed
    top 0
    left 0
    right 0
    background-color white

  .nav:after
    @extend .hr-line

  .go-back
    position absolute
    left 10px
</style>

