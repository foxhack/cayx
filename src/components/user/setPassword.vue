<template>
  <div id="set-password">
    <mt-field
        type="number"
        :label="title || '交易密码'"
        :placeholder="placeholder || '请输入6位数字的交易密码'"
        :state="state1"
        :value="value"
        @input.native="check1($event.target.value)">
    </mt-field>
    <mt-field
        :disabled="state1!=='success'"
        type="number"
        label="重复密码"
        :state="state2"
        placeholder="请再次输入密码"
        v-model="repeat" @input.native="check2($event.target.value)">
    </mt-field>
    <div v-if="state=='error'" class="error">{{errorMsg}}</div>
  </div>
</template>
<script>
  export default{
    name     : 'EmailInput',
    data(){
      return {
        password : '',
        repeat   : '',
        state1   : '',
        state2   : '',
        errorMsg : '',
      }
    },
    props    : [
      'title',
      'placeholder',
      'inputname',
      'value'
    ],
    computed : {
      state(){
        if (this.state1=='success' && this.state2=='success') {
          this.setValid(true)
          this.$emit('input', this.password)
          return 'success'
        }
        if (this.state1=='error' || this.state2=='error') {
          this.setValid(false)
          return 'error'
        }
      }
    },

    methods : {
      check1(val){
        this.password = val
        console.log('调用密码1检查方法')
        let reg = /^\d{6}$/
        if (!reg.test(val)) {
          this.state1 = 'error'
          this.errorMsg = '请输入6位数字的密码'
        } else if (val!==this.repeat) {
          this.state1 = 'success'
          this.state2 = 'error'
          this.errorMsg = '两次输入的密码不相等'
        } else {
          this.state1 = 'success'
          this.state2 = 'success'
        }
      },
      check2(val){
        console.log('调用密码2检查方法')
        console.log('first:'+this.password)
        console.log('seconed1:'+val)
        if (this.password!==val) {
          this.state2 = 'error'
          this.errorMsg = '两次输入的密码不相等'
        } else {
          this.state2 = 'success'
        }
      },
      setValid(isValid){
        this.$emit('isValid', { 'key' : this.inputname, 'isValid' : isValid })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  .error
    color error-color
    text-align right
    padding-right 10px
    font-size 0.8em
    line-height 3em
</style>

