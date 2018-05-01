<template>
  <div id="user-setting" v-if="isRegister">
    <!--<section v-if="userInfo.mobile!==undefined">-->
    <section>
      <name-input
          :editable="!isBindCard"
          inputname="name"
          v-model="post.name"
          v-on:isValid="setValid">
      </name-input>
      <idno-input
          :editable="!isBindCard"
          inputname="cardNo"
          v-model="post.cardNo"
          v-on:isValid="setValid">
      </idno-input>
      <telephone-input
          :editable="true"
          inputname="mobile"
          v-model="post.mobile"
          v-on:isValid="setValid">
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
          inputname="email"
          v-model="post.email"
          v-on:isValid="setValid">
      </email-input>
      <address-input
          :editable="true"
          inputname="address"
          v-model="post.address"
          v-on:isValid="setValid">
      </address-input>
    </section>
    <input type="button" class="primary-btn" value="提交修改" :disabled="forbidSubmit" @click="updateUser" style="margin-bottom: 10px">
    <input type="button" class="primary-btn plain" :disabled="false" value="放弃修改" @click="abort">

  </div>
</template>
<script>
  import { updateUserInfo, getUserByUserID } from '@/api/user'
  import NameInput from '@/components/user/nameInput'
  import IdnoInput from '@/components/user/idnoInput'
  import TelephoneInput from '@/components/user/telephoneInput'
  import IdentifyCode from '@/components/user/identifyCode'
  import EmailInput from '@/components/user/emailInput'
  import AddressInput from '@/components/user/addressInput'
  import { mixin }from '@/utils/mixin'

  export default{
    components : { NameInput, IdnoInput, TelephoneInput, IdentifyCode, EmailInput, AddressInput },
    name       : 'UserSetting',
    data(){
      return {
        submitting  : false,
        allowSubmit : { init : true },
        post        : {
          name         : null,
          cardNo       : null,
          identifyCode : null,
          mobile       : null,
          email        : null,
          address      : null
        }
      }
    },
    mixins     : [mixin],
    computed   : {
      forbidSubmit(){
        console.log('触发计算属性')
        if (this.submitting) return true
        if (Object.keys(this.allowSubmit).length===1) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }
    },
    methods    : {
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      abort(){
        this.$router.go(-1)
      },
      updateUser(){
        this.submitting = true
        let post = { userID : window.localStorage.getItem('userID') }
        for (let k in this.post) {
          if (this.allowSubmit[k]) post[k] = this.post[k]
        }
        console.log(post)
        let _ = this
        this.$post(updateUserInfo(post), { showProgress : 'submit', showSuccessMsg : true, callback : { success : successCallback, always : alwaysCallback } })
        function successCallback() {
          _.$post(getUserByUserID(window.localStorage.getItem('userID')), { callback : { success : successCallback } })
          function successCallback(data) {
            _.$store.commit('setUser', data)
            _.post = { ..._.userInfo }
          }
        }

        function alwaysCallback() {
          console.log('恢复提交按钮')
          _.submitting = false
        }
      }
    },
    mounted(){
      this.post = { ...this.userInfo }
    }
  }

</script>
