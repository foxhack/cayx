<template>
  <div id="user-setting" class="page-with-top" v-if="isRegister">
    <section>
      <name-input
          :editable="!isBindCard"
          :displayInput="displayInput.name"
          inputname="name"
          v-model="post.name"
          v-on:isValid="setValid"
          v-on:showInput="showInput">
      </name-input>
      <idno-input
          :editable="!isBindCard"
          :displayInput="displayInput.cardNo"
          inputname="cardNo"
          v-model="post.cardNo"
          v-on:isValid="setValid"
          v-on:showInput="showInput">
      </idno-input>
      <telephone-input
          :editable="true"
          :displayInput="displayInput.mobile"
          inputname="mobile"
          v-model="post.mobile"
          v-on:isValid="setValid"
          v-on:showInput="showInput">
      </telephone-input>
      <identify-code
          v-if="post.mobile!==userInfo.mobile && allowSubmit.mobile"
          :mobile="post.mobile"
          inputname="identifyCode"
          :isValid="allowSubmit.mobile"
          v-model="post.identifyCode"
          :initcheck="true"
          v-on:isValid="setValid">
      </identify-code>
      <email-input
          :editable="true"
          :displayInput="displayInput.email"
          inputname="email"
          v-model="post.email"
          v-on:isValid="setValid"
          v-on:showInput="showInput">
      </email-input>
      <address-input
          :editable="true"
          :displayInput="displayInput.address"
          inputname="address"
          v-model="post.address"
          v-on:isValid="setValid"
          v-on:showInput="showInput">
      </address-input>
    </section>
    <input type="button" class="primary-btn" value="提交修改" :disabled="forbidSubmit" @click="updateUser" style="margin-bottom: 10px">
    <input type="button" class="primary-btn plain" :disabled="false" value="放弃修改" @click="abort">

  </div>
</template>
<script>
  import { api } from '@/api/api'
  import NameInput from '@/components/user/nameInput'
  import IdnoInput from '@/components/user/idnoInput'
  import TelephoneInput from '@/components/user/telephoneInput'
  import IdentifyCode from '@/components/user/identifyCode'
  import EmailInput from '@/components/user/emailInput'
  import AddressInput from '@/components/user/addressInput'

  export default{
    components : { NameInput, IdnoInput, TelephoneInput, IdentifyCode, EmailInput, AddressInput },
    name       : 'UserSetting',
    data(){
      return {
        displayInput : {
          name    : false,
          cardNo  : false,
          mobile  : false,
          email   : false,
          address : false
        },
        submitting   : false,
        allowSubmit  : { init : true },
        post         : {
          name         : null,
          cardNo       : null,
          identifyCode : null,
          mobile       : null,
          email        : null,
          address      : null
        }
      }
    },
    computed   : {
      forbidSubmit(){
        console.log('触发计算属性')
        if (this.submitting) return true
        if (Object.keys(this.allowSubmit).length===1) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }
    },
    methods    : {
      showInput(inputName){
        this.displayInput[inputName] = true
      },
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      abort(){
        this.$router.push({ path : '/user' })
      },
      updateUser(){
        this.submitting = true
        let post = { userID : window.localStorage.getItem('userID') }
        for (let k in this.post) {
          if (this.allowSubmit[k]) post[k] = this.post[k]
        }
        console.log(post)
        let _ = this
        this.$post(api('updateUserInfo',post), { showProgress : '数据提交中，请稍候...', showSuccessMsg : true, callback : { success : successCallback, always : alwaysCallback } })
        function successCallback() {
          _.$post(api('getUserByUserID',{userID:window.localStorage.getItem('userID')}), { callback : { success : successCallback } })
          function successCallback(data) {
            _.$store.commit('setUser', data)
            _.post = { ..._.userInfo }
          }
        }

        function alwaysCallback() {
          console.log('恢复提交按钮')
          _.submitting = false
          for (let k in _.displayInput) {_.displayInput[k] = false}
        }
      }
    },
    watch      : {
      '$route'(){

      }
    },
    mounted(){
      this.post = { ...this.userInfo }
    }
  }

</script>
