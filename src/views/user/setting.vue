<template>
  <div id="user-setting" v-if="isRegister">
    <section v-if="userInfo.mobile!==undefined">
      <mt-cell title="姓名" is-link @click.native="popupVisible=true">{{userInfo.name}}</mt-cell>
      <mt-cell title="身份证号" is-link>{{userInfo.cardNo}}</mt-cell>
      <mt-cell title="手机号" is-link>{{userInfo.mobile}}</mt-cell>
      <mt-cell title="email" is-link>{{userInfo.email}}</mt-cell>
      <mt-cell title="联系地址" is-link>{{userInfo.address}}</mt-cell>
    </section>
    <mt-popup v-model="popupVisible" position="top" style="width: 100%">
      <mt-field label="姓名" placeholder="请输入姓名"></mt-field>
    </mt-popup>
  </div>
</template>
<script>
  import { Popup } from 'mint-ui'

  export default{
    name       : 'UserSetting',
    data(){
      return {
        popupVisible : false
      }
    },
    computed   : {
      isRegister(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCayx
      },
      userInfo(){
        return this.$store.state.user && this.$store.state.user.userInfo
      }
    },
    components : { 'mt-popup' : Popup }
  }

</script>
