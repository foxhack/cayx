<template>
  <div id="nav">
    <div class="wrapper center">
      <div class="title">{{title}}</div>
      <div class="go-back arrow-left" v-if="showBack" @click="goback">&nbsp;&nbsp;返回</div>
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
/*不能设置高度，在页面过渡时，底部按钮的fix-bottom位置有计算过程
  #nav
    height navHeight
    position relative
*/
  .wrapper
    background-color secondary-text-color
    color white
    z-index 2000
    position fixed
    height navHeight
    top 0
    left 0
    right 0
    width 100vw

  .title
    font-size large
    font-family pingfang-bold

  .go-back
    position absolute
    left 10px
</style>

