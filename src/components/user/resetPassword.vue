<template>
  <div id="reset-password">
    <section v-if="!showNew">
        <div class="cell">第一步：请输入注册时的手机号</div>
      <telephone-input
          :editable="false"
          inputname="mobile"
          v-model="post.mobile"
          v-on:isValid="setValid">
      </telephone-input>
      <identify-code
          :mobile="post.mobile"
          inputname="identifyCode"
          :isValid="true"
          v-model="post.identifyCode"
          v-on:isValid="setValid">
      </identify-code>
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
        post        : {
          mobile       : null,
          identifyCode : null
        },
        allowSubmit : { init : true },
        showNew     : false
      }
    },
    components : { TelephoneInput, IdentifyCode, NewPassword },
    computed   : {
      forbidSubmit(){
        console.log('触发计算属性')
        if (Object.keys(this.allowSubmit).length===1) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }
    },
    methods    : {
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      sendIdentity(){
        let _ = this
        _.showNew = true
      }
    },
    created(){
      this.post.mobile = this.userInfo.mobile
    }
  }
</script>
