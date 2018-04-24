<template>
  <div id="register">
    <bind-account v-on:bindSuccess="showSuccessDialog"></bind-account>
    <section v-if="!isRegister">
      <div class="title">注册长安严选</div>
      <!--<mt-cell title="手机号" class="mint-field">-->
      <!--<input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">-->
      <!--</mt-cell>-->
      <!--<mt-cell v-show="errors.has('email')" class="help is-danger" :title="errors.first('email')"></mt-cell>-->

      <telephone-input v-on:update="setNewUserInfo" v-on:allowSubmit="setAllowSubmit"></telephone-input>
      <identify-code :mobile="post.mobile" :isValid="allowSubmit.mobile" v-on:update="setNewUserInfo" v-on:allowSubmit="setAllowSubmit"></identify-code>
      <!--<mt-field label="手机号" type="number" placeholder="请输入手机号" v-model="post.mobile" required></mt-field>-->
      <!--<mt-field label="验证码" type="number" placeholder="请输入收到验证码" v-model="post.identifyCode">-->
        <!--<span class="get-code-btn" :class="{active:post.mobile}" v-show="!count" @click="getIdentifyCode(5)">获取验证码</span>-->
        <!--<span class="count-num" v-show="count">{{count}}&nbsp;秒后重新获取</span>-->
      <!--</mt-field>-->
      <input type="button" class="primary-btn fix-bottom" :disabled="forbidSubmit" value="注册" @click="register">
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
  import { bindUserAccount, register, getUserByUserID } from '@/api/user'
  import { fetchData } from '@/utils/common.js'
  import BindAccount from '@/components/user/bindAccount'
  import UserSetting from '@/views//user/setting'
  import TelephoneInput from '@/components/user/telephoneInput'
  import IdentifyCode from '@/components/user/identifyCode'

  export default{
    components : { BindAccount, UserSetting, TelephoneInput, IdentifyCode},
    name       : 'Register',
    data(){
      return {
        allowSubmit   : {},
        post          : {
          userID       : window.localStorage.getItem('userID'),
          mobile       : null,
          identifyCode : null
        },
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
      showBind(){
        return this.$store.state.user && this.$store.state.user.userStatus.isRegisterCaej && !this.$store.state.user.userStatus.isRegisterCayx
      },
      forbidSubmit(){
        if (Object.keys(this.allowSubmit).length==0) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }
    },
    methods    : {
      setNewUserInfo(newData){
        this.post[newData.key] = newData.val
      },
      setAllowSubmit(field){
        this.$set(this.allowSubmit, field.key, field.val)
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
            if (_.currentPath=='/user/register') {
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

