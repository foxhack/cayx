<template>
  <div id="set-password" v-if="isOpenAccount" class="page-with-top">
    <section v-if="!isSetPassword">
      <new-password></new-password>
    </section>
    <template v-else>
      <div v-show="view==''">
        <mt-cell title="修改密码" is-link @click.native="view='update'"></mt-cell>
        <mt-cell title="找回密码" is-link @click.native="view='reset'"></mt-cell>
      </div>
      <update-password v-if="view=='update'" v-on:close="view=''"></update-password>
      <reset-password v-if="view=='reset'" v-on:close="view=''"></reset-password>
    </template>
  </div>
</template>

<script>
  import NewPassword from '@/components/user/newPassword'
  import UpdatePassword from '@/components/user/updatePassword'
  import ResetPassword from '@/components/user/resetPassword'

  export default{
    name       : 'PasswordSetting',
    data(){
      return {
        view : ''
      }
    },
    components : { NewPassword, UpdatePassword, ResetPassword },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.isOpenAccount) vm.$router.push('/user')
      })
    }
  }
</script>

