<template>
  <section v-if="isRegister && !isSetPassword">
    <div class="title">设置新交易密码</div>
    <mt-field
        type="password"
        label="交易密码"
        placeholder="请输入6位数字的交易密码"
        :state="state1"
        @input.native="check1($event.target.value)">
    </mt-field>
    <mt-field
        :disabled="state1!=='success'"
        type="password"
        label="重复密码"
        :state="state2"
        placeholder="请再次输入密码"
        v-model="repeat" @input.native="check2($event.target.value)">
    </mt-field>
    <div class="error">{{errorMsg}}&nbsp;</div>
    <input type="button" class="primary-btn" style="margin-top:10px" :disabled="state!=='success'" value="确定设置">
  </section>
</template>
<script>

  export default{
    name       : 'NewPassword',
    data(){
      return {
        password : '',
        repeat   : '',
        state1   : '',
        state2   : '',
        errorMsg : '',
      }
    },
    computed   : {
      isRegister(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCayx
      },
      isSetPassword(){
        return this.$store.state.user && this.$store.state.user.userStatus.isSetPassword
      },
      state(){
        if (this.state1=='success' && this.state2=='success') {
          return 'success'
        }
        if (this.state1=='error' || this.state2=='error') {
          return 'error'
        }
      }
    },
    methods    : {
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
          this.errorMsg = ''
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
          this.errorMsg = ''
        }
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

  #set-password .mint-field-core
    -webkit-text-security disc
    text-security disc
</style>
