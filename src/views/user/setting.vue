<template>
  <div id="user-setting" class="page-with-top" v-if="isRegister">
    <section>
      <name-input :key="id" ref="name" :readonly="isOpenAccount" filterValue :initValue="userInfo.name"></name-input>
      <idno-input :key="id+1" ref="cardNo" :readonly="isOpenAccount" filterValue :initValue="userInfo.cardNo"></idno-input>
      <telephone-input :key="id+2" ref="mobile" :readonly="isOpenAccount" filterValue :initValue="userInfo.mobile" v-on:setMobile="mobile=$refs.mobile.value"></telephone-input>
      <identify-code :key="id+3" v-if="showIdentifyCode" ref="identifyCode" :validMobile="mobile"></identify-code>
      <email-input :key="id+4" ref="email" filterValue :initValue="userInfo.email"></email-input>
      <address-input :key="id+5" ref="address" filterValue :initValue="userInfo.address"></address-input>
    </section>
    <input type="button" class="primary-btn" value="提交修改" :disabled="forbidSubmit" @click="updateUser" style="margin-bottom: 10px">
    <input type="button" class="primary-btn plain"  value="放弃修改" @click="abort">

  </div>
</template>
<script>
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
        id         : +new Date(),
        mobile     : null,
        submitting : false,
        state      : {
          name         : false,
          cardNo       : false,
          email        : false,
          address      : false,
          mobile       : false,
          identifyCode : false
        }
      }
    },
    computed   : {
      showIdentifyCode(){
        return this.state.mobile && this.mobile!=this.userInfo.mobile
      },
      forbidSubmit(){
        console.log('重新计算是否要禁用提交按钮')
        if (this.showIdentifyCode && !this.state.identifyCode) return true
        return (Object.values(this.state).every(e => {return e===false}))
      }
    },
    methods    : {
      abort(){
        this.$router.push({ path : '/user' })
      },
      updateUser(){
        let postData = { userID : this.$store.state.userID }
        for (let k in this.state) {
          if (this.state[k]) postData[k] = this.$refs[k].value
        }

        this.submitting = true
        let _ = this
        this.$post('updateUserInfo', postData, { showProgress : '数据提交中，请稍候...', showSuccessMsg : true, callback : { success : successCallback, always : alwaysCallback } })
        function successCallback(data) {
          _.$store.commit('setUser', data)
          _.id = +new Date()
          _.mobile = null
          for (let k in _.state) {
            _.state[k] = false
          }
        }

        function alwaysCallback() {
          _.submitting = false
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.isRegister) vm.$router.push('/user')
      })
    }
  }

</script>
