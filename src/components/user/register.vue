<template>
  <div id="register" class="page-with-top">
    <bind-account v-if="isRegisterCaej && !isRegister" v-on:bindSuccess="bindSuccess"></bind-account>
    <section v-if="!isRegister">
      <telephone-input
          :editable="true"
          :displayInput="true"
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
      <input type="button" class="primary-btn" :disabled="forbidSubmit" value="注册" @click="register">
    </section>
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <router-link :to="{path:'/product'}"><input type="button" class="primary-btn" value="去逛商品"></router-link>
        <input type="button" class="primary-btn plain" @click="$router.replace({path:'/user/setting'})" value="去完善信息">
      </div>
    </result>
  </div>
</template>
<script>
  import { api } from '@/api/api'
  import BindAccount from '@/components/user/bindAccount'
  import TelephoneInput from '@/components/user/telephoneInput'
  import IdentifyCode from '@/components/user/identifyCode'
  import Instruction from '@/views/user/instruction'
  import Result from '@/components/user/result'

  export default{
    components : { BindAccount, TelephoneInput, IdentifyCode, Instruction, Result },
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
        if (this.submitting) return true
        if (!this.agree) return true
        if (Object.keys(this.allowSubmit).length===1) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }
    },
    methods    : {
      bindSuccess(result){
        this.result = result
      },
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      register(){
        this.submitting = true
        let post = { userID : this.post.userID }
        for (let k in this.post) {
          if (this.allowSubmit[k]) post[k] = this.post[k]
        }
        console.log(post)
        let _ = this
        this.$post(api('register',post), {
          showProgress   : '数据提交中，请勿重复提交...',
          showSuccessMsg : _.currentPath!=='/user/register',//作为组件使用的
          callback       : { success : successCallback, always : alwaysCallback }
        })
        function successCallback() {
          _.$post(api('getUserByUserID',{userID:post.userID}), { callback : { success : successCallback } })
          function successCallback(data) {
            if (_.currentPath=='/user/register') {
              _.result = { show : true, title : '注册结果', content : '恭喜您，注册成功' }
            }//作为路由使用的
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
      console.log('组件register::::'+this.currentPath)
      if(this.isRegister) this.result = { show : true, title : '注册结果', content : '恭喜您，注册成功' }

    },
    beforeRouteEnter (to, from, next) {
      console.log('register component from:'+from.fullPath)
      next()
    }
  }
</script>

