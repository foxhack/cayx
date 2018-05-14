<template>
  <div v-if="showPasswordSetting" id="transaction-password-setting">
    <el-dialog :visible="showPasswordSetting" fullscreen :title="'请'+title" center :show-close="false">
      <svg class="icon close" aria-hidden="true" @click="showPasswordSetting=false">
        <use xlink:href="#icon-close"></use>
      </svg>
      <new-password v-if="!isSetPassword" v-on:close="showPasswordSetting=false"></new-password>
      <reset-password v-else v-on:close="showPasswordSetting=false"></reset-password>
    </el-dialog>
  </div>
  <div v-else id="transaction-input">
    <el-dialog :visible="true" width="100%" title="请输入交易密码" center :show-close="false">
      <div class="set-password" @click="showPasswordSetting=true">{{title}}</div>
      <div style="font-size: large;text-align:center; padding: 1em">{{tInfo.title}}</div>
      <div style="font-size: xx-large;text-align:center">
        {{tInfo.amount|money}}元
      </div>
      <span slot="footer" class="dialog-footer">
      <password-input v-on:getPassword="getPassword"></password-input>
        <div class="primary-btn plain" @click="$emit('close')">取 消</div>
      <div class="primary-btn"
                 @click="$emit('transactionSubmit', password.password)"
                 :disabled="password===null || (password && !password.isValid) || tInfo.submitting==true"
                 >确 定</div>
    </span>
    </el-dialog>
  </div>
</template>
<script>
  import PasswordInput from '@/components/user/passwordInput'
  import NewPassword from '@/components/user/newPassword'
  import ResetPassword from '@/components/user/resetPassword'

  export default{
    name       : 'TransactionInput',
    data(){
      return {
        password            : null,
        showPasswordSetting : false
      }
    },
    props      : ['tInfo'],
    components : { PasswordInput, NewPassword, ResetPassword },
    computed   : {
      title(){
        return this.isSetPassword ? '找回密码' : '设置密码'
      }
    },
    methods    : {
      getPassword(password){
        this.password = password
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"

  .set-password
    color error-color
    text-align right
    padding-right 10px
    line-height 3em
    position absolute
    right 10px

  #transaction-input
    .primary-btn
      width 40%
      display inline-flex

  .icon.close
    position absolute
    top 10px
    right 10px
    fill white
    width 1.2em
    height 1.2em
</style>
