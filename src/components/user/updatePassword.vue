<template>
  <div id="update-password" v-if="isRegister && isSetPassword">
    <section v-if="!showNew">
      <div class="title">修改交易密码</div>
      <mt-field
          type="password"
          label="原交易密码"
          placeholder="请输入原交易密码"
          :state="state"
          v-model="oldPassword" @input.native="check($event.target.value)">
      </mt-field>
      <div class="error">{{errorMsg}}&nbsp;</div>
      <input type="button" class="primary-btn" :disabled="state!=='success'" value="确定" @click="sendOldPassword">
    </section>
    <new-password v-if="showNew" :setNew="true"></new-password>
  </div>
</template>
<script>
  import NewPassword from '@/components/user/newPassword'
  export default{
    name       : 'UpdatePassword',
    data(){
      return {
        oldPassword : '',
        state       : '',
        errorMsg    : '',
        showNew     : false
      }
    },
    components : { NewPassword },
    computed   : {
      isRegister(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCayx
      },
      isSetPassword(){
        return this.$store.state.user && this.$store.state.user.userStatus.isSetPassword
      }
    },
    methods    : {
      check(val){
        console.log('调用密码检查方法')
        let reg = /^\d{6}$/
        if (!reg.test(val)) {
          this.state = 'error'
          this.errorMsg = '请输入6位数字的密码'
        } else {
          this.state = 'success'
          this.errorMsg = ''
        }
      },
      sendOldPassword(){
        let _ = this
        _.showNew = true
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
