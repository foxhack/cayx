<template>
  <div id="register" class="register-wrapper page-with-top">
    <bind-account v-if="isRegisterCaej && !isRegister" v-on:bindSuccess="bindSuccess"></bind-account>
    <div class="logo-wrapper">
      <div class="avatar-wrapper">
        <img class="avatar" :src="userAvatar">
      </div>
      <div class="logo-text-wrapper">
        <div class="logo">长安严选理财Slogan</div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="input-wrapper">
        <div class="mobile-wrapper">
          <div class="el-icon-mobile-phone"></div>
          <input type="tel" placeholder="请输入注册手机号码" :class="{active:mobile}" :value="mobile" @input="checkMobile($event.target.value)">
          <div class="el-icon-circle-check" v-if="state.mobile"></div>
        </div>
        <div class="identify-wrapper">
          <div class="el-icon-edit-outline"></div>
          <input type="tel" placeholder="验证码" :class="{active:identifyCode}" :value="identifyCode" @input="checkIdentifyCode($event.target.value)">
          <div class="el-icon-circle-check" v-if="state.identifyCode"></div>
          <span class="get-code-btn" :class="{active:state.mobile}" v-show="!count" @click="getIdentifyCode(5)">获取验证码</span>
          <span class="count-num" v-show="count">{{count}}&nbsp;秒后重新获取</span>
        </div>
        <div class="agree-wrapper">
          <el-checkbox v-model="agree" style="padding-left:10px;padding-top:10px">已阅读并同意</el-checkbox>
          <span style="font-size:14px;text-decoration:underline" @click="showInstruction=true">用户协议</span>
        </div>
      </div>
      <div class="confirm-wrapper">
        <input type="button" class="primary-btn" :disabled="forbidSubmit" value="注册" @click="register">
      </div>
    </div>
    <instruction v-if="showInstruction" title="用户协议" v-on:closeInstruction="showInstruction=false"> </instruction>
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <router-link :to="{path:'/user/openaccount'}"><input type="button" class="primary-btn" value="申请开户"></router-link>
        <router-link :to="{path:'/user'}"><input type="button" class="primary-btn plain" value="返回我的理财"></router-link>
      </div>
    </result>
  </div>
</template>
<script>
  import BindAccount from '@/components/user/bindAccount'
  import Instruction from '@/views/user/instruction'
  import Result from '@/components/user/result'
  import { VALIDATE } from '@/utils/config'

  export default{
    components : { BindAccount, Instruction, Result },
    name       : 'Register',
    data(){
      return {
        count           : 0,
        showInstruction : false,
        submitting      : false,
        mobile          : null,
        identifyCode    : null,
        state           : {
          mobile       : false,
          identifyCode : false
        },
        errorMsg        : {
          mobile       : '',
          identifyCode : ''
        },
        agree           : false,
        result          : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        }
      }
    },
    computed   : {
      forbidSubmit(){
        console.log('重新计算是否要禁用提交按钮')
        if (!this.agree) return true
        return (Object.values(this.state).some(e => {return e===false}))
      }
    },
    methods    : {
      bindSuccess(result){
        this.result = result
      },
      checkMobile(val){
        this.mobile = val
        this.mobile = val.substr(0, 11)
        if (!VALIDATE.mobile.test(this.mobile)) {
          this.state.mobile = false
        } else {
          this.state.mobile = true
        }
      },
      checkIdentifyCode(val){
        this.identifyCode = val
        if (!VALIDATE.identifyCode.test(this.identifyCode)) {
          this.state.identifyCode = false
        } else {
          this.state.identifyCode = true
        }
      },
      register(){
        let postData = { userID : this.userID }
        for (let k in this.state) {
          postData[k] = this[k].value
        }
        this.submitting = true
        let _ = this
        this.$post('register', postData, {
          showProgress   : '注册信息提交中，请勿重复提交...',
          showSuccessMsg : _.currentPath!=='/user/register',//作为组件使用的
          callback       : { success : successCallback, always : alwaysCallback }
        })
        function successCallback(data) {
          if (_.currentPath=='/user/register') {
            _.result = { show : true, title : '注册结果', content : '恭喜您，注册成功' }
          }
          _.$store.commit('setUser', data)
        }

        function alwaysCallback() {
          if (!this.isRegister) _.submitting = false
        }
      },
      getIdentifyCode(countDown){
        console.log('get code')
        let _ = this
        startCountDown(countDown)
        let postData = { userID : this.$store.state.userID, mobile : this.validMobile }
        this.$post('getIdentifyCode', postData, { showSuccessMsg : false })
        function startCountDown(num) {
          _.count = num
          _countDown()
          function _countDown() {
            setTimeout(() => {
              _.count--
              if (_.count > 0) _countDown()
            }, 1000)
          }
        }
      }
    },
    created(){
      console.log('组件register::::'+this.currentPath)
      if (this.isRegister) this.result = { show : true, type : 'success', title : '注册结果', content : '恭喜您，注册成功' }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .register-wrapper
    width 100vw
    height 100vh
    max-height 100vh
    display flex
    flex-direction column

    .logo-wrapper, .content-wrapper
      flex 1
      display flex
      flex-direction column
      position relative
      align-items center

    .avatar-wrapper, .logo-text-wrapper
      display flex

    .avatar-wrapper
      flex 3
      align-items flex-end

    .logo-text-wrapper
      flex 2
      align-items center

    .logo
      font-size 2em

    img.avatar
      width 4em
      height 4em
      border-radius 50%

  .content-wrapper
    justify-content space-around
    .input-wrapper
      width 15em
      flex 1
      input
        background none
      input.active
        font-size large
      .mobile-wrapper, .identify-wrapper
        display flex
        flex-direction row
        padding 10px 0 5px 0
        border-bottom 1px solid
      .agree-wrapper
        margin-left -10px
        margin-bottom 1em
    .confirm-wrapper
      flex 1
      width 100%

  .el-icon-mobile-phone, .el-icon-edit-outline, .el-icon-circle-check
    font-size 1.4em
    line-height 1.4em
  .el-icon-mobile-phone, .el-icon-edit-outline
    margin-right 10px

  .get-code-btn, .count-num
    white-space nowrap
    font-size 0.8em
    padding 0.2em 0.4em
    display inline-block
    line-height 2em
    margin-left 10px

  .get-code-btn
    color #fff
    border-radius 0.4em
    border 1px solid
    background striking-text-color
    opacity 0.3

  .get-code-btn.active
    opacity 1

  .count-num
    {third-level}

</style>
