<template>
  <div id="new-bank">
    <div v-if="bindCard.length==0" class='add-bank center' v-show="!showNewBank" @click="showNewBank=true">添加银行卡</div>
    <mt-cell v-if="bindCard.length>0" v-show="!showNewBank" @click.native="showNewBank=true" title="添加银行卡" is-link></mt-cell>
    <section v-if="showNewBank">
      <mt-cell v-if="post.bankCode" :title="post.bankSelectedName" label="已选择" is-link @click.native="showBankList=true"></mt-cell>
      <mt-cell v-if="!post.bankCode" title="请选择一个银行" is-link @click.native="showBankList=true"></mt-cell>
      <div v-show="showBankList" class="bank-list">
        <mt-cell v-for="b in bankList" :key="b.code" class="bank" :class="{'selected':post.bankCode==b.code}" @click.native="checkBank(b.code,b.name)" :title="b.name">
          <div slot="icon" class="bank-icon" :style="{backgroundPosition: b.logoPos}"></div>
        </mt-cell>
      </div>
      <div v-if="post.bankCode">
        <div class="title" style="margin-top:1em">请输入银行卡信息</div>
        <mt-cell title="持卡人姓名" label="与开户信息一致">{{userInfo.name|name}}</mt-cell>
        <mt-cell title="身份证号" label="与开户信息一致">{{userInfo.cardNo|IDCardNo}}</mt-cell>
        <bankcard-input
            inputname="bankCardNo"
            :initcheck="true"
            v-model="post.bankCardNo"
            v-on:isValid="setValid">
        </bankcard-input>
        <telephone-input
            :editable="true"
            inputname="bankSavedmobile"
            :displayInput="displayInput.bankSavedmobile"
            :initcheck="true"
            subtitle="银行预留手机号"
            placeholder="请输入在银行预留的手机号"
            v-model="post.bankSavedmobile"
            v-on:isValid="setValid"
            v-on:showInput="showInput">
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
  </div>
</template>
<script>
  import { BANKS } from '@/utils/config'
  import BankcardInput from '@/components/user/bankcardInput'
  import TelephoneInput from '@/components/user/telephoneInput'
  import IdentifyCode from '@/components/user/identifyCode'

  export default{
    data(){
      return {
        showNewBank  : false,
        fromPath     : null,
        submitting   : false,
        allowSubmit  : { init : true },
        bankList     : BANKS,
        showBankList : true,
        post         : {
          bankSelectedName : null,
          bankCode         : null,
          bankCardNo       : null,
          bankSavedmobile  : null,
          identifyCode     : null,
        },
        displayInput : {
          bankSavedmobile : false
        },
        result       : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        }
      }
    },
    components : {
      BankcardInput,
      TelephoneInput,
      IdentifyCode
    },
    computed   : {
      forbidSubmit(){
        if (this.submitting) return true
        if (Object.keys(this.allowSubmit).length===1) return true
        return (Object.values(this.allowSubmit).some(e => {return e===false}))
      }
    },
    methods    : {
      initData(val){
        console.log('初始化userInfo')
        this.post.bankSavedmobile = val.mobile
      },
      showInput(inputName){
        this.displayInput[inputName] = true
      },
      setValid(isValid){
        this.$set(this.allowSubmit, isValid.key, isValid.isValid)
      },
      checkBank(bcode, bname){
        this.post.bankCode = bcode
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
        this.$post('bindCard', post, false, {
          showProgress   : '绑卡信息提交中，请勿重复提交...',
          showSuccessMsg : true,
          callback       : { success : successCallback, always : alwaysCallback }
        })
        function successCallback() {
          _.$post('getUserByUserID', { userID : post.userID }, false, {
            showProgress : '绑卡信息更新中...',
            callback     : { success : successCallback }
          })
          function successCallback(data) {
            _.$store.commit('setUser', data)
            _.$emit('refresh')
          }
        }

        function alwaysCallback() {
          _.submitting = false
        }
      }
    },
    created(){
      this.initData(this.userInfo)
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

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

  .add-bank
    width 90%
    color silver
    margin 0.5em auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em
</style>
