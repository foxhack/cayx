<template>
  <div v-if="showPasswordSetting" id="transaction-password-setting">
    <el-dialog :visible="true" fullscreen :title="'请'+title" center :show-close="false">
      <new-password v-if="!isSetPassword" v-on:close="showPasswordSetting=false"></new-password>
      <reset-password v-else v-on:close="showPasswordSetting=false"></reset-password>
    </el-dialog>
  </div>
  <div v-else id="transaction-input">
    <el-dialog :visible="true"  width="100%" title="请输入交易密码" center :show-close="false">
      <div class="set-password" @click="showPasswordSetting=true">{{title}}</div>
      <div style="font-size: large;text-align:center; padding: 1em">{{tInfo.title}}</div>
      <div style="font-size: xx-large;text-align:center">
        {{toCent|money}}元
      </div>
      <span slot="footer" class="dialog-footer">
      <password-input v-on:getPassword="getPassword"></password-input>
      <el-button @click="$emit('close')" style="width: 40%">取 消</el-button>
      <el-button type="primary"
                 @click="$emit('transactionSubmit', password.password)"
                 :disabled="password===null || (password && !password.isValid) || tInfo.submitting==true"
                 style="width: 40%">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
  import PasswordInput from '@/components/user/passwordInput'
  import NewPassword from '@/components/user/newPassword'
  import ResetPassword from '@/components/user/resetPassword'
  import { mixin }from '@/utils/mixin'

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
    mixins     : [mixin],
    computed   : {
      title(){
        return this.isSetPassword?'找回密码':'设置密码'
      },
      toCent(){
        return parseFloat(this.tInfo.amount)*100
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
    font-size 0.8em
    line-height 3em
    position absolute
    right 10px
</style>
