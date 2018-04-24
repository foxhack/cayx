<template>
  <div id="user-setting" v-if="isRegister">
    <section v-if="userInfo.mobile!==undefined">
      <name-input
          :editable="allowMod"
          :initVal="userInfo.name"
          v-on:update="setNewUserInfo"
          v-on:allowSubmit="setAllowSubmit">
      </name-input>
      <idno-input
          :editable="allowMod"
          :initVal="userInfo.cardNo"
          v-on:update="setNewUserInfo"
          v-on:allowSubmit="setAllowSubmit">
      </idno-input>
      <telephone-input
          :editable="true"
          :initVal="userInfo.mobile"
          v-on:update="setNewUserInfo"
          v-on:allowSubmit="setAllowSubmit">
      </telephone-input>
      <identify-code v-if="allowSubmit.mobile"
                     :mobile="post.mobile"
                     :isValid="allowSubmit.mobile"
                     v-on:update="setNewUserInfo"
                     v-on:allowSubmit="setAllowSubmit">
      </identify-code>
      <email-input
          :editable="true"
          :initVal="userInfo.email"
          v-on:update="setNewUserInfo"
          v-on:allowSubmit="setAllowSubmit">
      </email-input>
      <address-input
          :editable="true"
          :initVal="userInfo.address"
          v-on:update="setNewUserInfo"
          v-on:allowSubmit="setAllowSubmit">
      </address-input>
    </section>
    <input type="button" class="primary-btn" :disabled="forbidSubmit" value="提交修改" @click="submit" style="margin-bottom: 10px">
    <input type="button" class="primary-btn plain" :disabled="false" value="放弃修改" @click="abort">

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
        allowSubmit : {},
        post        : {
          userID  : window.localStorage.getItem('userID'),
          name    : null,
          cardNo  : null,
          mobile  : null,
          email   : null,
          address : null
        }
      }
    },
    computed   : {
      isRegister(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCayx
      },
      userInfo(){
        return this.$store.state.user && this.$store.state.user.userInfo
      },
      allowMod(){
//        return false
        return !(this.$store.state.user && this.$store.state.user.userStatus.isBindCard)
      },
      forbidSubmit(){
        if (Object.keys(this.allowSubmit).length==0) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }

    },
    methods    : {
      setNewUserInfo(newData){
        this.post[newData.key] = newData.val
      },
      setAllowSubmit(field){
        this.$set(this.allowSubmit, field.key, field.val)
      },
      abort(){
        this.$router.go(-1)
      },
      submit(){
        for (let k in this.post) {
          if (this.post[k]) console.log('提交修改'+this.post[k])
        }
      }
    }
  }

</script>
