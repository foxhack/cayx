<template>
  <div id="register" style="min-height:100vh">
    <bind-account v-on:bindSuccess="showSuccessDialog"></bind-account>
    <section v-if="!isRegister">
      <div class="title">注册长安严选</div>
      <telephone-input
          :editable="true"
          inputname="mobile"
          v-model="post.mobile"
          v-on:isValid="setValid">
      </telephone-input>
      <identify-code
          :mobile="post.mobile"
          inputname="identifyCode"
          :isValid="allowSubmit.mobile"
          v-model="post.identifyCode"
          v-on:isValid="setValid">
      </identify-code>
      <el-checkbox v-model="agree" style="padding-left:10px;padding-top:10px">已阅读并同意</el-checkbox>
      <span style="font-size:14px;text-decoration:underline" @click="showInstruction=true">用户协议</span>
      <instruction
          v-if="showInstruction"
          title="用户协议" v-on:closeInstruction="showInstruction=false">
      </instruction>
      <input type="button" class="primary-btn fix-bottom" :disabled="forbidSubmit" value="注册" @click="register">
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
  import TelephoneInput from '@/components/user/telephoneInput'
  import IdentifyCode from '@/components/user/identifyCode'
  import Instruction from '@/views/user/instruction'

  export default{
    components : { BindAccount, TelephoneInput, IdentifyCode, Instruction },
    name       : 'Register',
    data(){
      return {
        showInstruction : false,
        submitting      : false,
        allowSubmit     : { init : true },
        post            : {
          userID       : window.localStorage.getItem('userID'),
          mobile       : null,
          identifyCode : null
        },
        agree           : false,
        successDialog   : {
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
        console.log('重新计算是否要禁用提交按钮')
        if (this.submitting) return true
        if (!this.agree) return true
        if (Object.keys(this.allowSubmit).length===1) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }
    },
    methods    : {
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      showSuccessDialog(options){
        console.log('调用弹出窗口方法')
        this.successDialog = options
      },
      register(){
        this.submitting = true
        let post = { userID : this.post.userID }
        for (let k in this.post) {
          if (this.allowSubmit[k]) post[k] = this.post[k]
        }
        console.log(post)
        let _ = this
        fetchData(register(post), { showProgress : 'submit', callback : { success : successCallback, always : alwaysCallback } })
        function successCallback() {
          fetchData(getUserByUserID(post.userID), { callback : { success : successCallback } })
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

        function alwaysCallback() {
          console.log('恢复注册按钮')
          _.submitting = false
        }
      }
    },
    created(){
      console.log('组件register')
    }
  }
</script>

