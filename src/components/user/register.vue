<template>
  <div id="register">
    <bind-account v-on:bindSuccess="showSuccessDialog"></bind-account>
    <section v-if="!isRegister">
      <div class="title">注册长安严选</div>
      <!--<mt-cell title="手机号" class="mint-field">-->
      <!--<input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">-->
      <!--</mt-cell>-->
      <!--<mt-cell v-show="errors.has('email')" class="help is-danger" :title="errors.first('email')"></mt-cell>-->
      <mt-field label="手机号" type="number" placeholder="请输入手机号" v-model="post.mobile" required></mt-field>
      <mt-field label="验证码" type="number" placeholder="请输入收到验证码" v-model="post.identifyCode">
        <span class="get-code-btn" :class="{active:post.mobile}" v-show="!count" @click="getIdentifyCode(5)">获取验证码</span>
        <span class="count-num" v-show="count">{{count}}&nbsp;秒后重新获取</span>
      </mt-field>
      <input type="button" class="primary-btn fix-bottom" :disabled="allowSubmit" value="注册" @click="register">
    </section>
    <section v-if="isRegister && currentPath=='/user/register'">
      <user-setting></user-setting>
    </section>
    <el-dialog :visible=successDialog.showSuccess :title="successDialog.successTitle" center :show-close="false" class="dialog-wrapper">
      <div>{{successDialog.successDescription}}</div>
      <span slot="footer" class="dialog-footer">
        <router-link :to="{path:'/product'}"><el-button type="primary">去逛商品</el-button></router-link>
        <router-link :to="{path:'/user/setting'}"><el-button type="primary">完善信息</el-button></router-link>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { bindUserAccount, getIdentifyCode, register, getUserByUserID } from '@/api/user'
  import { fetchData } from '@/utils/common.js'
  import BindAccount from '@/components/user/bindAccount'
  import UserSetting from '@/views//user/setting'

  export default{
    components : { BindAccount, UserSetting },
    name       : 'Register',
    data(){
      return {
        post          : {
          userID       : window.localStorage.getItem('userID'),
          mobile       : null,
          identifyCode : null
        },
        count         : 0,
        successDialog : {
          showSuccess        : false,
          successTitle       : '',
          successDescription : '',
        }
      }
    },
    computed   : {
      currentPath(){
        return this.$route.path
      },
      isRegister(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCayx
      },
      allowSubmit(){
        let post = this.post
        return !(post.mobile && post.identifyCode)
      },
      showBind(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCaej && !this.$store.state.user.userStatus.isRegisterCayx
      }
    },
    methods    : {
      getIdentifyCode(countDown){
        if (!this.post.mobile) return
        this.startCountDown(countDown)
        let postData = { userID : this.post.userID, mobile : this.post.mobile }
        fetchData(getIdentifyCode(postData))
        function startCountDown(num) {
          this.count = num
          let _ = this
          _countDown()
          function _countDown() {
            setTimeout(() => {
              _.count--
              if (_.count > 0) _countDown()
            }, 1000)
          }
        }
      },
      showSuccessDialog(options){
        console.log('调用弹出窗口方法')
        this.successDialog = options
      },
      register(){
        let _ = this
        fetchData(register(_.post), { callback : { success : successCallback } })
        function successCallback() {
          fetchData(getUserByUserID(_.post.userID), { callback : { success : successCallback } })
          function successCallback(data) {
            if(_.currentPath=='/user/register'){
              _.showSuccessDialog({
                showSuccess        : true,
                successTitle       : '注册成功',
                successDescription : '恭喜您，注册成功'
              })
            }
            _.$store.commit('setUser', data)
          }
        }
      }
    },
    created(){
      console.log('组件register')

    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .get-code-btn, .count-num
    font-size 0.8em
    padding 0.2em 0.4em
    display inline-block
    line-height 2em
    margin-left 10px

  .get-code-btn
    color #fff
    border-radius 0.4em
    border 1px solid
    background primary-text-color
    opacity 0.3

  .get-code-btn.active
    background secondary-text-color
    opacity 1

  .count-num
    {third-level}
</style>
