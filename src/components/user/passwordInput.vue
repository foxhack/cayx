<template>
  <div id="password-wrapper">
    <div class="password-input center">
      <span class="fake-input center" :class="{'active':password.length==n-1}" v-for="n in 6">
        <span :class="{'input':password[n-1]!==undefined}"></span>
      </span>
    </div>
    <div id="password-keyboard" class="flex-col">
      <div class="flex-row">
        <span  v-for="n in 3" @click="setNumber(n)">{{n}}</span>
      </div>
      <div class="flex-row">
        <span  v-for="n in [4,5,6]" @click="setNumber(n)">{{n}}</span>
      </div>
      <div class="flex-row">
        <span  v-for="n in [7,8,9]" @click="setNumber(n)">{{n}}</span>
      </div>
      <div class="flex-row">
        <span @click="$emit('close')">取消</span>
        <span @click="setNumber(0)">0</span>
        <span @click="setBack">X</span></div>
    </div>
  </div>
</template>
<script>
  import { VALIDATE } from '@/utils/config'
  export default{
    data(){
      return {
        password     : []
      }
    },
    methods  : {
      setNumber(n){
        let len=this.password.length
        if (len < 6) {
          this.password.push(n)
          this.$emit('set-password', this.password.join(''))
        }
      },
      setBack(){
        let len=this.password.length
        if (len > 0) {
          this.password.pop()
          this.$emit('set-password',this.password.join(''))
        }
      }
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
    justify-content space-between
    .fake-input
      width 2em
      height 2em
      border-radius 5px
      border 1px solid neutral-border-color2
      text-align center
    .fake-input.active
      border-color secondary-text-color
    span.input
      width 4px
      height 4px
      border-radius 50%
      background-color secondary-text-color


  #password-keyboard
    .flex-row
      font-size large
      height 3em
      border-top 1px solid neutral-border-color2
    span
      flex 1
      line-height 3em
      border-right 1px solid neutral-border-color2
    span:first-child
      border-left 1px solid neutral-border-color2

</style>
