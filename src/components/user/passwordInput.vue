<template>
  <div id="password-wrapper">
      <div class="password-input">
        <input type="number" id="p1" v-model="p1" maxlength="1" required @focus="p1=null" @input="focus($event,'p2')">
        <input type="number" id="p2" v-model="p2" maxlength="1" required @focus="p2=null" @input="focus($event,'p3')">
        <input type="number" id="p3" v-model="p3" maxlength="1" required @focus="p3=null" @input="focus($event,'p4')">
        <input type="number" id="p4" v-model="p4" maxlength="1" required @focus="p4=null" @input="focus($event,'p5')">
        <input type="number" id="p5" v-model="p5" maxlength="1" required @focus="p5=null" @input="focus($event,'p6')">
        <input type="number" id="p6" v-model="p6" maxlength="1" required @focus="p6=null" @input="$event.target.blur()">
      </div>
      <div class="error">{{errorMsg}}&nbsp;</div>
    </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  export default{
    data(){
      return {
        p1        : null,
        p2        : null,
        p3        : null,
        p4        : null,
        p5        : null,
        p6        : null
      }
    },
    computed   : {
      errorMsg(){
        let password = this.p1+this.p2+this.p3+this.p4+this.p5+this.p6
        if (!VALIDATE.password.test(password)) {
          this.$emit('getPassword', { isValid : false, password : password })
          return '请输入6位数字的密码'
        } else {
          this.$emit('getPassword', { isValid : true, password : password })
        }
      }
    },
    methods    : {
      focus(e, f){
        e.target.blur()
        document.getElementById(f).focus()
      },
      resetPassword(){

      }
    },
    mounted(){
      document.getElementById("p1").focus()
    },
    created(){
      console.log('输入密码组件')
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"
  .password-input
    position relative
    width 14em
    margin 10px auto
    @extend .center
    justify-content space-between
    input
      width 2em
      height 2em
      border-radius 5px
      border 1px solid neutral-border-color2
      -webkit-text-security disc
      text-security disc

  .tip
    text-decoration underline

  .error
    color error-color
    text-align right
    padding-right 10px
    font-size 0.8em
    line-height 3em
</style>
