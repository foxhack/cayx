<template>
  <div id="set-password" v-if="isRegister" class="page-with-top">
    <section v-if="isRegister && !isSetPassword">
      <new-password></new-password>
    </section>
    <template v-if="isRegister && isSetPassword">
      <section>
        <mt-cell v-if="view==''" title="修改密码" is-link @click.native="view='update'"></mt-cell>
        <update-password v-if="view=='update'" v-on:close="view=''"></update-password>
      </section>
      <section>
        <mt-cell title="找回密码" v-show="view==''" is-link @click.native="view='reset'"></mt-cell>
        <reset-password v-if="view=='reset'" v-on:close="view=''"></reset-password>
      </section>
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
  }
</script>

