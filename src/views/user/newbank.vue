<template>
  <div id="new-bank">
    <section class="progress">
      <div class="step" :class="{active:p.step<=currentProgress}" v-for="p in progress">
        <div class="img" :class="{active:p.step<=currentProgress}">{{p.step}}</div>
        <div>{{p.title}}</div>
      </div>
    </section>
    <section v-show="currentProgress==1">
      <register></register>
    </section>
    <section v-show="currentProgress==2">
      <mt-cell v-if="post.bankCode" :title="post.bankSelectedName" is-link @click.native="showBankList=true"></mt-cell>
      <mt-cell v-if="!post.bankCode" title="请选择一个银行" is-link @click.native="showBankList=true"></mt-cell>
      <div v-show="showBankList" class="bank-list">
        <mt-cell v-for="b in bankList" :key="b.id" class="bank" :class="{'selected':post.bankCode==b.id}" @click.native="checkBank(b.id,b.name)" :title="b.name">
          <div slot="icon" class="bank-icon" :style="{backgroundPosition: b.logoPos}"></div>
        </mt-cell>
      </div>
      <div v-if="post.bankCode">
        <div class="title">请输入银行卡信息</div>
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
      <new-password></new-password>
      <input type="button" class="primary-btn fix-bottom" @click="upload" value="完成">
      <div class="title">请上传身份证</div>
      <mt-cell title="持卡人姓名">{{post.name}}</mt-cell>
      <mt-cell title="持卡人身份证号">{{post.cardNo}}</mt-cell>
      <div class="upload">正面</div>
      <div class="upload">背面</div>
    </section>
    <el-dialog :visible=successDialog.showSuccess :title="successDialog.successTitle" center :show-close="false" class="dialog-wrapper">
      <div>{{successDialog.successDescription}}</div>
      <span slot="footer" class="dialog-footer">
        <router-link :to="{path:successDialog.nextPath}"><el-button type="primary">{{successDialog.nextName}}</el-button></router-link>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { BANKS } from '@/utils/config'
  import { openAccount, getUserByUserID } from '@/api/user'
  import Register from '@/components/user/register'
  import NameInput from '@/components/user/nameInput'
  import BankcardInput from '@/components/user/bankcardInput'
  import IdnoInput from '@/components/user/idnoInput'
  import TelephoneInput from '@/components/user/telephoneInput'
  import IdentifyCode from '@/components/user/identifyCode'
  import NewPassword from '@/components/user/newPassword'
  import { mixin }from '@/utils/mixin'

  export default{
    data(){
      return {
        submitting    : false,
        successDialog : {
          showSuccess        : false,
          successTitle       : '开户成功',
          successDescription : '恭喜您已成功开户!',
          nextPath           : '',
          nextName           : ''
        },
        allowSubmit   : { init : true },
        progress      : [
          { step : 1, title : '注册长安严选' },
          { step : 2, title : '填写卡信息' },
          { step : 3, title : '设置交易密码' }
        ],
        bankList      : BANKS,
        showBankList  : true,
        post          : {
          bankSelectedName : null,
          bankCode         : null,
          name             : null,
          cardNo           : null,
          bankCardNo       : null,
          bankSavedmobile  : null,
          identifyCode     : null,
        },
        count         : 0,
      }
    },
    components : {
      Register,
      NameInput,
      BankcardInput,
      IdnoInput,
      TelephoneInput,
      IdentifyCode,
      NewPassword
    },
    mixins     : [mixin],
    computed   : {
      currentProgress(){
        if (!this.$store.state.user || this.$store.state.user && !this.$store.state.user.userStatus.isRegisterCayx) {
          return 1
        }
        else {
          if (this.$store.state.user && !this.$store.state.user.userStatus.isBindCard) {
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
        this.$post(openAccount(post), { showProgress : 'submit', showSuccessMsg : true, callback : { success : successCallback, always : alwaysCallback } })
        function successCallback(data) {
          _.$post(getUserByUserID(window.localStorage.getItem('userID')), { callback : { success : successCallback } })
          function successCallback(data) {
            _.$store.commit('setUser', data)
          }
        }

        function alwaysCallback() {
          console.log('恢复注册按钮')
          _.submitting = false
        }
      },
      upload(){
        this.successDialog.showSuccess = true
        this.successDialog.nextPath = this.$store.state.toPath
        this.successDialog.nextName = '继续操作'
      }
    },
    created(){
      this.initData(this.userInfo)
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"
  #new-bank
    min-height calc(100vh + 5.4em)
    padding 1em 0 4em 0

  .progress:after
    @extend .hr-line
    color primary-text-color

  .progress
    position relative
    background #fff
    height 4em
    @extend .flex-row
    justify-content space-around
    align-items center
    .step.active
      color secondary-text-color
      {first-level}
    .step
      @extend .flex-col
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
        @extend .center
      /*background-size contain*/
      .img.active
        background-color secondary-text-color

  /*.step:nth-child(1) .img*/
  /*background-image url('../../assets/icon/bankcard.svg')*/
  /*.step:nth-child(2) .img*/
  /*background-image url('../../assets/icon/userinfo.svg')*/
  /*.step:nth-child(3) .img*/
  /*background-image url('../../assets/icon/cardinfo.svg')*/

  /*.step.active:nth-child(1) .img*/
  /*background-image url('../../assets/icon/bankcard_active.svg')*/
  /*.step.active:nth-child(2) .img*/
  /*background-image url('../../assets/icon/userinfo_active.svg')*/
  /*.step.active:nth-child(3) .img*/
  /*background-image url('../../assets/icon/cardinfo_active.svg')*/

  .bank
    font-family font-family-bold

  .bank.selected
    position relative

  .bank.selected:after
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
    right 1em
    width 1.2em
    height 1.2em
    background-image url('../../assets/icon/card_selected.svg')
    background-size contain

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
    @extend .center
    width 90%
    margin 10px auto
    line-height 4em
    font-size 2em
    {third-level}
    border 2px dashed
    border-radius 0.2em
</style>
