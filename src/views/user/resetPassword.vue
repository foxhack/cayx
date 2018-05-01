<template>
  <div id="update-password" v-if="isRegister && isSetPassword">
    <section v-if="!showNew">
      <div class="title">找回交易密码</div>
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
    <new-password v-if="showNew" :setNew="true" :resultClose="resultClose" v-on:close="$emit('close')"></new-password>
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
    props:['resultClose'],
    components : { TelephoneInput, IdentifyCode, NewPassword },
    computed   : {
      isRegister(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCayx
      },
      isSetPassword(){
        return this.$store.state.user && this.$store.state.user.userStatus.isSetPassword
      },
      userInfo(){
        return this.$store.state.user && this.$store.state.user.userInfo
      },
      forbidSubmit(){
        console.log('触发计算属性')
        if (Object.keys(this.allowSubmit).length===1) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }
    },
    watch      : {
      userInfo(val){
        console.log('watch初始化userInfo')
        this.initData(val)//第一次直接进入组件初始化
      }
    },
    methods    : {
      initData(val){
        this.post.mobile = val.mobile
      },
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      sendIdentity(){
        let _ = this
        _.showNew = true
      }
    },
    created(){
      if (this.userInfo) {
        console.log('create初始化userInfo')
        this.initData(this.userInfo)
      }
    }
  }
</script>
