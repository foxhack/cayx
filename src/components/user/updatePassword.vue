<template>
  <div id="update-password">
    <section v-if="!showNew">
      <div class="cell">第一步：请输入原交易密码</div>
      <div style="position: relative">
        <mt-field
            type="password"
            label="原交易密码"
            placeholder="请输入原交易密码"
            :state="state"
            v-model="oldPassword" @input.native="check($event.target.value)">
        </mt-field>
        <div v-if="state=='error'" class="error">{{errorMsg}}&nbsp;</div>
      </div>
      <input type="button" class="primary-btn" :disabled="state!=='success' || submitting" value="确定" @click="sendOldPassword">
    </section>
    <new-password v-if="showNew" title="第二步：请设置新交易密码" v-on:close="$emit('close')"></new-password>
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
        showNew     : false,
        submitting  : false
      }
    },
    components : { NewPassword },
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
        this.submitting = true
        let post = { userID : window.localStorage.getItem('userID'), tradepwd : this.oldPassword }
        this.$post('validPassword', post,
          {
            showProgress : '请稍候...',
            callback     : { success : successCallback, always : alwaysCallback }
          })
        let _ = this

        function successCallback() {
          _.showNew = true
        }

        function alwaysCallback() {
          _.submitting = false
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  #set-password .mint-field-core
    -webkit-text-security disc
    text-security disc
</style>
