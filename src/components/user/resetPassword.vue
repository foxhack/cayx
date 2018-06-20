<template>
  <div id="reset-password">
    <section v-if="!showNew">
      <div class="cell">第一步：请输入注册时的手机号</div>
      <telephone-input ref="mobile" v-on:setMobile="mobile=$refs.mobile.value"></telephone-input>
      <identify-code ref="identifyCode" :validMobile="state.mobile && mobile"></identify-code>
      <input type="button" class="primary-btn" :disabled="forbidSubmit" value="确定" @click="sendIdentity">
    </section>
    <new-password v-if="showNew" title='第二步：请设置新交易密码' v-on:close="$emit('close')"></new-password>
  </div>
</template>
<script>
  import TelephoneInput from '@/components/user/telephoneInput'
  import IdentifyCode from '@/components/user/identifyCode'
  import NewPassword from '@/components/user/newPassword'

  export default{
    name       : 'ResetPassword',
    data(){
      return {
        submitting : false,
        mobile     : null,
        state      : {
          mobile       : false,
          identifyCode : false
        },
        showNew    : false
      }
    },
    components : { TelephoneInput, IdentifyCode, NewPassword },
    computed   : {
      forbidSubmit(){
        console.log('触发计算属性')
        return (Object.values(this.state).some(e => {return e===false}))
      }
    },
    methods    : {
      sendIdentity(){
        let postData = { userID : this.$store.state.userID }
        for (let k in this.state) {
          postData[k] = this.$refs[k].value
        }
        this.submitting = true

        let _ = this
        this.$post('validUser', postData, {
          showProgress : '用户验证中...',
          callback     : { success : successCallback }
        })
        function successCallback(data) {
          _.showNew = true
        }
        function alwaysCallback() {
          _.submitting = false
        }
      }
    }
  }
</script>
