<template>
  <div id="menu" class="fix-bottom">
    <div class="main-menu flex-row">
      <router-link to="/product" class="main-btn center" :class="{active:path.indexOf('/product')>-1}">
        <svg class="icon menu-icon" aria-hidden="true">
          <use xlink:href="#icon-licaishouyi"></use>
        </svg>
        长安聚宝盆
      </router-link>
      <router-link to="/user" class="main-btn center" :class="{active:path.indexOf('/user')>-1}">
        <svg class="icon menu-icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanjifenxinzhuce"></use>
        </svg>
        我的理财
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
   .fix-bottom
      width 100vw
      top calc(100vh - 3.4em)//menuHeight

  .main-menu
    height menuHeight
    color secondary-text-color
    background-color #f5f5f5
    border-top 1px solid secondary-text-color

  .main-btn
    border-radius 0px
    width 100%
    bottom 0px
    border-left none
    border-right none
    border-bottom none
    position relative
    font-size extra-extra-small
    flex-direction column

  .menu-icon
    width 2em
    height 2em

  .main-btn.active
    background-color secondary-text-color
    color white

</style>
