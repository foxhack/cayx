<template>
  <div id="nav">
    <div class="wrapper">
      <div class="go-back" v-if="showBack" @click="goback"><返回</div>
      <div class="title">{{title}}</div>
    </div>
  </div>
</template>
<script>
  export default{
    props : ['title','showBack'],
    methods:{
      goback(){
        console.log('返回')
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../style/base.styl'
  #nav
    height 2.8em
    position relative

  .wrapper
    @extend .center
    background-color white
    z-index 2000
    position fixed
    height 2.8em
    top 0
    left 0
    right 0

  .wrapper:after
    @extend .hr-line

  .go-back
    position absolute
    left 10px
</style>

