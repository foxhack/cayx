<template>
  <div id="register" class="page-with-top">
    <bind-account v-if="isRegisterCaej && !isRegister" v-on:bindSuccess="bindSuccess"></bind-account>
    <section v-if="!isRegister">
      <div class="title">请输入注册信息</div>
      <telephone-input ref="mobile" v-on:setMobile="mobile=$refs.mobile.value"></telephone-input>
      <identify-code ref="identifyCode" :validMobile="state.mobile && mobile"></identify-code>
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
        <router-link :to="{path:'/user/openaccount'}"><input type="button" class="primary-btn" value="申请开户"></router-link>
        <router-link :to="{path:'/user'}"><input type="button" class="primary-btn plain" value="返回会员中心"></router-link>
      </div>
    </result>
  </div>
</template>
<script>
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
        mobile       : null,
        state           : {
          mobile       : false,
          identifyCode : false
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
      register(){
        let postData={userID:window.localStorage.getItem('userID')}
        for (let k in this.state){
          postData[k]=this.$refs[k].value
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
          }//作为路由使用的
          _.$store.commit('setUser', data)
        }
        function alwaysCallback() {
          if (!this.isRegister) _.submitting = false
        }
      }
    },
    created(){
      console.log('组件register::::'+this.currentPath)
      if (this.isRegister) this.result = { show : true, title : '注册结果', content : '恭喜您，注册成功' }
    },
  }
</script>

