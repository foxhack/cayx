<template>
  <div id="menu" class="fix-bottom" style="bottom:-4px">
    <div class="main-menu">
      <router-link to="/product" class="main-btn">
        <el-button type="default" size="large" :class="{active:path=='/product'}">长安聚宝盆</el-button>
      </router-link>
      <router-link to="/user" class="main-btn">
        <el-button type="default" size="large" :class="{active:path=='/user'}">我的账户</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default{
    name     : 'Menu',
    computed : {
      path(){
        return this.$route.path
      }
    },
    created(){
      console.log('menu组件')
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../style/base.styl'
  #menu
   height 3em

  .main-menu
    @extend .flex-row

  .main-btn, .main-btn button
    border-radius 0px
    @extend .center
    height 3em
    width 100%
    bottom 0px
    border-left none
    border-right none
    border-bottom none
    position relative

  .main-btn button.active
    color #3a8ee6
    background-color #ecf5ff


</style>
