<template>
  <transition name="slide">
    <div id="instruction-wrapper">
      <div class="top">
        <div class="go-back" @click="close">
          <返回
        </div>
        <div class="">{{title}}</div>
      </div>
      <div class="content">
        说明页组件
        <password-input v-on:getPassword="getPassword"></password-input>
      </div>
    </div>
  </transition>
</template>
<script>
  import PasswordInput from '@/components/user/passwordInput'
  export default{
    data(){
      return {
        password : null
      }
    },
    name       : 'Instruction',
    props      : ['title'],
    components : { PasswordInput },
    methods    : {
      getPassword(password){
        this.password = password
      },
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

</style>
