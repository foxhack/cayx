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
    <el-dialog :visible="true" width="100%" fullscreen title="请输入交易密码" center :show-close="false">
      <svg class="icon close" aria-hidden="true" @click="$emit('close')">
        <use xlink:href="#icon-close"></use>
      </svg>
      <div class="info-title" v-html="tInfo.title"></div>
      <div class="info-subtitle" v-html="tInfo.subTitle"></div>
      <div class="money-confirm">
        {{tInfo.amount|money}}元
      </div>
      <span slot="footer" class="dialog-footer">
      <div class="set-password" @click="showPasswordSetting=true">{{title}}</div>
      <password-input ref="password" v-on:close="$emit('close')" v-on:set-password="password=$event"></password-input>
      <input type="button" class="primary-btn"
             @click="$emit('transactionSubmit', password)"
             :disabled="password==null || password!==null && password.length!=6|| tInfo.submitting==true"
             value="确定">
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
        return this.isSetPassword ? '找回密码' : '设置交易密码'
      }
    },
    created(){
      this.showPasswordSetting = !this.isSetPassword
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base.styl"

  .set-password
    color info-color
    text-align right
    font-size small

  .icon.close
    position absolute
    top 10px
    right 10px
    fill white
    width 1.2em
    height 1.2em

  .info-title
    font-size large
    text-align center
    padding 0.6em

  .info-subtitle
    font-size x-large
    text-align center
    padding 0.6em
    color secondary-text-color

  .money-confirm
    font-size xx-large
    text-align center
    color secondary-text-color

  .primary-btn
    width 100%
    border-radius 0
    margin 0

</style>
