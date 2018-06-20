<template>
  <div id="new-bank">
    <div v-if="bindCard.length==0" class='add-bank center' v-show="!showNewBank" @click="showNewBank=true">添加银行卡</div>
    <mt-cell v-if="bindCard.length>0" v-show="!showNewBank" @click.native="showNewBank=true" title="添加银行卡" is-link></mt-cell>
    <section v-if="showNewBank">
      <bank-item v-if="selectedBank" :bankCode="selectedBank" subTitle="已选择" @click.native="showBankList=true" isLink></bank-item>
      <!--<mt-cell v-if="selectedBank" :title="getBankName(selectedBank)" label="已选择" is-link >-->
      <mt-cell v-else title="请选择一个银行" is-link @click.native="showBankList=true"></mt-cell>
      <div v-show="showBankList">
        <bank-item v-for="b in bankList"
                   :key="b.code"
                   :bankCode="b.code"
                   :selected="selectedBank==b.code"
                   @click.native="selectBank(b.code,b.name)">
        </bank-item>
      </div>
      <div v-if="selectedBank">
        <div class="title" style="margin-top:1em">请输入银行卡信息</div>
        <mt-cell title="持卡人姓名" label="与开户信息一致">
          <template v-if="isOpenAccount">
            {{userInfo.name|name}}
          </template>
          <template v-else>
            {{this.$parent.$refs.name.value | name}}
          </template>
        </mt-cell>
        <mt-cell title="身份证号" label="与开户信息一致">
          <template v-if="isOpenAccount">
            {{userInfo.cardNo|IDCardNo}}
          </template>
          <template v-else>
            {{this.$parent.$refs.cardNo.value | IDCardNo}}
          </template>
        </mt-cell>
        <bankcard-input ref="bankCardNo"></bankcard-input>
        <telephone-input ref="mobile"
                         title="银行预留手机号"
                         placeholder="请输入在银行预留的手机号"
                         filterValue initcheck
                         :initValue="userInfo.mobile"
                         v-on:setMobile="mobile=$refs.mobile.value"></telephone-input>
        <identify-code v-if="showIdentifyCode" ref="identifyCode" :validMobile="mobile"></identify-code>
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
  import BankItem from '@/components/user/bankItem'

  export default{
    data(){
      return {
        showNewBank  : false,
        fromPath     : null,
        submitting   : false,
        bankList     : BANKS,
        showBankList : true,
        selectedBank : null,
        mobile       : null,
        state        : {
          bankCardNo   : false,
          mobile       : false,
          identifyCode : false,
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
      BankItem,
      BankcardInput,
      TelephoneInput,
      IdentifyCode
    },
    computed   : {
      showIdentifyCode(){
        return this.state.mobile && this.mobile!=this.userInfo.mobile
      },
      forbidSubmit(){
        if (this.submitting || !this.selectedBank || !this.state.bankCardNo || !this.state.mobile) return true
        if (this.showIdentifyCode && !this.state.identifyCode) return true
        return false
      }
    },
    methods    : {
      selectBank(bcode){
        this.selectedBank = bcode
        this.showBankList = false
      },
      submitBankInfo(){
        let postData = { userID : this.$store.state.userID, bankCode : this.selectedBank }
        for (let k in this.state) {
          if (k=='mobile' && this.state[k]) {
            postData['bankSavedMobile'] = this.$refs[k].value
          } else {
            if (this.state[k]) postData[k] = this.$refs[k].value
          }
        }
        //在开户阶段绑卡时，不提交绑卡信息，而是向上抛出绑卡信息
        if (this.currentPath!=='/user/bank') {
          this.$emit('getBankInfo', postData)
          return
        }

        this.submitting = true
        let _ = this
        this.$post('bindCard', postData, {
          showProgress   : '绑卡信息提交中，请勿重复提交...',
          showSuccessMsg : true,
          callback       : { success : successCallback, always : alwaysCallback }
        })
        function successCallback(data) {
          _.$store.commit('setUser', data)
          _.$emit('refresh')
        }

        function alwaysCallback() {
          _.submitting = false
        }
      }
    },
  }
</script>
