<template>
  <div id="set-password" v-if="isRegister">
    <new-password v-show="isRegister && !isSetPassword"></new-password>
    <template v-if="isRegister && isSetPassword">
      <section>
        <mt-cell v-show="view==''" title="修改密码" is-link @click.native="view='update'"></mt-cell>
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
  import { mixin }from '@/utils/mixin'

  export default{
    name       : 'PasswordSetting',
    data(){
      return {
        view : ''
      }
    },
    components : { NewPassword, UpdatePassword, ResetPassword },
    mixins     : [mixin]
  }
</script>

