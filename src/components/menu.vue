<template>
  <div id="menu" class="fix-bottom">
    <div class="main-menu flex-row">
      <router-link to="/product" class="main-btn center" :class="{active:path=='/product'}">
        <svg class="icon menu-icon" aria-hidden="true">
          <use xlink:href="#icon-licaishouyi"></use>
        </svg>
        长安聚宝盆
      </router-link>
      <router-link to="/user" class="main-btn center" :class="{active:path=='/user'}">
        <svg class="icon menu-icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanjifenxinzhuce"></use>
        </svg>
        我的账户
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
    background-color white
    height menuHeight

  .main-menu
    border-top 1px solid gray

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
    color secondary-text-color

</style>
