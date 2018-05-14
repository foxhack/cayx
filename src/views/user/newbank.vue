<template>
  <div id="new-bank">
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
      <mt-cell v-if="post.bankCode" :title="post.bankSelectedName" label="已选择" is-link @click.native="showBankList=true"></mt-cell>
      <mt-cell v-if="!post.bankCode" title="请选择一个银行" is-link @click.native="showBankList=true"></mt-cell>
      <div v-show="showBankList" class="bank-list">
        <mt-cell v-for="b in bankList" :key="b.id" class="bank" :class="{'selected':post.bankCode==b.id}" @click.native="checkBank(b.id,b.name)" :title="b.name">
          <div slot="icon" class="bank-icon" :style="{backgroundPosition: b.logoPos}"></div>
        </mt-cell>
      </div>
      <div v-if="post.bankCode">
        <div class="title" style="margin-top:1em">请输入银行卡信息</div>
        <name-input
            title="持卡人姓名"
            placeholder="请输入真实的持卡人中文姓名"
            inputname="name"
            :initcheck="true"
            v-model="post.name"
            v-on:isValid="setValid">
        </name-input>
        <bankcard-input
            inputname="bankCardNo"
            :initcheck="true"
            v-model="post.bankCardNo"
            v-on:isValid="setValid">
        </bankcard-input>
        <idno-input
            inputname="cardNo"
            :initcheck="true"
            v-model="post.cardNo"
            v-on:isValid="setValid">
        </idno-input>
        <telephone-input
            :editable="true"
            inputname="bankSavedmobile"
            :initcheck="true"
            subtitle="银行预留手机号"
            placeholder="请输入在银行预留的手机号"
            v-model="post.bankSavedmobile"
            v-on:isValid="setValid">
        </telephone-input>
        <identify-code
            :mobile="post.bankSavedmobile"
            inputname="identifyCode"
            :isValid="allowSubmit.bankSavedmobile"
            :initcheck="true"
            v-model="post.identifyCode"
            v-on:isValid="setValid">
        </identify-code>
      </div>
      <input type="button" class="primary-btn fix-bottom" @click="submitBankInfo" :disabled="forbidSubmit" value="提交">
    </section>
    <section v-show="currentProgress==3">
      <input type="button" class="primary-btn fix-bottom" @click="complete" value="完成">
      <div class="title">请上传身份证(可选)</div>
      <mt-cell title="持卡人姓名">{{post.name|name}}</mt-cell>
      <mt-cell title="持卡人身份证号">{{post.cardNo|cardNo}}</mt-cell>
      <div class="upload center" @click="showUpload=true">正面</div>
      <div v-if="showUpload"><input type="file"></div>
      <div class="upload center">背面</div>
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
        showUpload: false,
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
          { step : 2, title : '填写卡信息' },
          { step : 3, title : '上传身份证' }
        ],
        bankList          : BANKS,
        showBankList      : true,
        post              : {
          bankSelectedName : null,
          bankCode         : null,
          name             : null,
          cardNo           : null,
          bankCardNo       : null,
          bankSavedmobile  : null,
          identifyCode     : null,
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
      BankcardInput,
      IdnoInput,
      TelephoneInput,
      IdentifyCode,
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
      getBankName(){
        return this.post.bankSelectedId && this.bankList.filter(b => {return b.id==this.post.bankSelectedId})[0].name
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
        this.post.cardNo = val.cardNo
        this.post.bankSavedmobile = val.mobile
      },
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      checkBank(bid, bname){
        this.post.bankCode = bid
        this.post.bankSelectedName = bname
        this.showBankList = false
      },
      submitBankInfo(){
        this.submitting = true
        let post = { userID : window.localStorage.getItem('userID'), bankCode : this.post.bankCode }
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
        this.$post(api('getUserByUserID', { userID : window.localStorage.getItem('userID') }), { showProgress : '请稍候...', callback : { success : successCallback } })
        function successCallback(data) {
          _.$store.commit('setUser', data)
        }
      }
    },
    created(){
      this.initData(this.userInfo)
//      console.log('获取wxconfig')
//      this.$post(api('getWxConfig', { url : 'http://caejfinance.s1.natapp.cc'+this.currentPath }), { callback : { success : successCallback } })
//      function successCallback(data) {
//        console.log(data)
//        wx.config({
//          debug     : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//          appId     : data.appID, // 必填，公众号的唯一标识
//          timestamp : data.timestamp, // 必填，生成签名的时间戳
//          nonceStr  : data.nonceStr, // 必填，生成签名的随机串
//          signature : data.signature,// 必填，签名
//          jsApiList : ['chooseImage'] // 必填，需要使用的JS接口列表
//        })
//      }
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

  .bank
    font-family font-family-bold

  .back
    color secondary-text-color
    line-height 4em
    text-align right
    font-size 0.8em
    span
      display inline-block
      line-height 4em
      padding-right 10px

  .bank-icon
    width 2em
    height 2em
    background-size 400% 500%
    background-image url('../../assets/icon/bank.jpg')
    display inline-block
    vertical-align middle
    margin-right 10px

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

  .upload
    width 90%
    margin 10px auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em
</style>
