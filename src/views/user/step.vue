<template>
  <div id="new-step">
    <section class="progress hr-line flex-row">
      <div class="step flex-col" :class="{active:p.step<=currentProgress}" v-for="p in progress">
        <div class="img center" :class="{active:p.step<=currentProgress}">{{p.step}}</div>
        <div>{{p.title}}</div>
      </div>
    </section>
    <section v-show="currentProgress==1">
      <register></register>
    </section>
    <section v-show="currentProgress==2">
      <div class="title" style="margin-top:1em">请输入开户信息</div>
      <name-input
          title="开户人姓名"
          placeholder="请输入真实的中文姓名"
          inputname="name"
          :initcheck="true"
          v-model="post.name"
          v-on:isValid="setValid">
      </name-input>
      <idno-input
          inputname="cardNo"
          :initcheck="true"
          v-model="post.cardNo"
          v-on:isValid="setValid">
      </idno-input>
      <telephone-input
          :editable="true"
          inputname="mobile"
          :initcheck="true"
          v-model="post.mobile"
          v-on:isValid="setValid">
      </telephone-input>
      <div class="title">请上传身份证(可选)</div>
      <mt-cell title="持卡人姓名">{{post.name|name}}</mt-cell>
      <mt-cell title="持卡人身份证号">{{post.cardNo|cardNo}}</mt-cell>
      <div class="upload center" @click="showUpload=true">正面</div>
      <div v-if="showUpload"><input type="file"></div>
      <div class="upload center">背面</div>
      <input type="button" class="primary-btn fix-bottom" @click="submitAccountInfo" :disabled="forbidSubmit" value="提交">
    </section>
    <section v-show="currentProgress==3">
    </section>
    <result v-if="result.show" :result="result">
      <div slot="footer">
        <input type="button" class="primary-btn" value="确定" @click="goNext">
      </div>
    </result>
  </div>
</template>
<script>
  import { BANKS } from '@/utils/config'
  import { api } from '@/api/api'
  import Register from '@/components/user/register'
  import NameInput from '@/components/user/nameInput'
  import BankcardInput from '@/components/user/bankcardInput'
  import IdnoInput from '@/components/user/idnoInput'
  import TelephoneInput from '@/components/user/telephoneInput'
  import IdentifyCode from '@/components/user/identifyCode'
  import Result from '@/components/user/result'

  export default{
    data(){
      return {
        showUpload        : false,
        fromPath          : null,
        submitAccountInfo : false,
        submitting        : false,
        successDialog     : {
          showSuccess        : false,
          successTitle       : '开户成功',
          successDescription : '恭喜您已成功开户!',
          nextPath           : '',
          nextName           : ''
        },
        allowSubmit       : { init : true },
        progress          : [
          { step : 1, title : '注册长安严选' },
          { step : 2, title : '开户' },
          { step : 3, title : '风险测评' },
        ],
        post              : {
          name   : null,
          cardNo : null,
          mobile : null,
        },
        result            : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        }
      }
    },
    components : {
      Register,
      NameInput,
      IdnoInput,
      TelephoneInput,
      Result
    },
    computed   : {
      currentProgress(){
        if (!this.isRegister) {
          return 1
        }
        else {
          if (!this.submitAccountInfo) {
            return 2
          }
          else {
            return 3
          }
        }
      },
      forbidSubmit(){
        if (this.submitting) return true
        if (Object.keys(this.allowSubmit).length===1) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }
    },
    methods    : {
      initData(val){
        console.log('初始化userInfo')
        this.post.name = val.name
        this.post.mobile = val.mobile
      },
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      submitAccountInfo(){
        this.submitting = true
        let post = { userID : this.$store.state.userID, bankCode : this.post.bankCode }
        for (let k in this.post) {
          if (this.allowSubmit[k]) post[k] = this.post[k]
        }
        console.log(post)
        let _ = this
        this.$post(api('openAccount', post), { showProgress : '数据提交中，请勿重复提交...', showSuccessMsg : true, callback : { success : successCallback, always : alwaysCallback } })
        function successCallback() {
          _.submitAccountInfo = true
        }

        function alwaysCallback() {
          _.submitting = false
        }
      },
      upload(){
      },
      complete(){
        this.result = { show : true, title : '开户结果', content : '恭喜您，开户成功' }
      },
      goNext(){
        let _ = this
        this.$post(api('getUserByUserID', { userID : this.$store.state.userID }), { showProgress : '请稍候...', callback : { success : successCallback } })
        function successCallback(data) {
          _.$store.commit('setUser', data)
        }
      }
    },
    created(){
      this.initData(this.userInfo)
    },
    beforeRouteEnter (to, from, next) {
      //目前为提供组件输出的形式，只有做为路由的形式存在，所以这段代码一定会执行
      console.log('newbank组件来自'+from.fullPath)
      next(vm => {
        vm.fromPath = from.fullPath
      })
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .progress
    color primary-text-color
    position relative
    background #fff
    height 4em
    justify-content space-around
    align-items center
    .step.active
      color secondary-text-color
      {first-level}
    .step
      align-items center
      {third-level}
      color primary-text-color
      font-size 0.8em
      .img
        width 2em
        height 2em
        background-color #f5f5f5
        border-radius 50%
        color #fff
        margin-bottom: 0.2em
      .img.active
        background-color secondary-text-color

  .upload
    width 90%
    margin 10px auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em
</style>
