<template>
  <div id="set-password">
    <section v-if="!isRegister">
      <register></register>
    </section>
    <new-password></new-password>
    <update-password></update-password>
    <router-link :to="{name:'resetPassword'}">
      <mt-cell v-if="isRegister && isSetPassword" title="找回密码" is-link></mt-cell>
    </router-link>
  </div>
</template>

<script>
  import Register from '@/components/user/register'
  import NewPassword from '@/components/user/newPassword'
  import UpdatePassword from '@/components/user/updatePassword'
  export default{
    name       : 'PasswordSetting',
    components : { Register, NewPassword, UpdatePassword },
    computed   : {
      isRegister(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCayx
      },
      isSetPassword(){
        return this.$store.state.user && this.$store.state.user.userStatus.isSetPassword
      }
    }
  }
</script>


