<template>
  <div id="open-account" class="page-with-top-bottom">
    <div v-show="!isOpenAccount">
      <section v-show="currentStep==1">
        <div class="title">请输入开户信息</div>
        <name-input ref="name" :initValue="userInfo.name" :initcheck="!!userInfo.name"></name-input>
        <idno-input ref="cardNo" :initValue="userInfo.cardNo" :initcheck="!!userInfo.cardNo"></idno-input>
        <mt-cell title="手机号" label="与注册手机号一致" @click.native="$message({message:'与注册手机号一致，如需修改，请前往我的账户->个人信息设置',duration:4000})">{{userInfo.mobile}}</mt-cell>
        <email-input ref="email" :initValue="userInfo.email" :initcheck="!!userInfo.email"></email-input>
        <address-input ref="address" :initValue="userInfo.address" :initcheck="!!userInfo.email"></address-input>
        <div class="title">请上传身份证</div>
        <div class="tip"><i class="el-icon-info"></i>如果你使用的是Android，请至少升级至4.3.1及以上</div>
        <image-upload-input ref="cardPhotoF" name="cardPhotoF" title="点击上传人像面" id="cardPhotoF"></image-upload-input>
        <image-upload-input ref="cardPhotoB" name="cardPhotoB" title="点击上传国徽面" id="cardPhotoB"></image-upload-input>
        <input type="button" class="primary-btn fix-bottom" @click="goNext" :disabled="forbidNext" value="下一步">
      </section>
      <new-bank v-show="!isOpenAccount && currentStep==2" v-on:getBankInfo="getBankInfo"></new-bank>
      <template v-if="!isOpenAccount && currentStep==3">
        <el-dialog :visible="currentStep==3" title="开户信息确认" center :show-close="false" class="dialog-wrapper" top="0">
          <div class="confirm-tip flex-row">
            <span class="el-icon-warning"></span>
            <span>除email、联系地址之外的信息在您成功开户后不能进行线上修改。请您在提交申请前再次确认。</span>
          </div>
          <div id="confirm-table">
            <div><span class="c-item">持卡人姓名</span><span class="c-content">{{$refs.name.value}}</span></div>
            <div><span class="c-item">身份证号</span><span class="c-content">{{$refs.cardNo.value}}</span></div>
            <div><span class="c-item">手机号</span><span class="c-content">{{userInfo.mobile|fMobile}}</span></div>
            <div><span class="c-item">开户银行</span><span class="c-content">{{getBankName(postData.bankCode)}}</span></div>
            <div><span class="c-item">银行卡号</span><span class="c-content">{{postData.bankCardNo}}</span></div>
            <div><span class="c-item">银行预留手机号</span><span class="c-content">{{postData.bankSavedMobile}}</span></div>
            <div><span class="c-item">email</span><span class="c-content">{{$refs.email.value}}</span></div>
            <div><span class="c-item last">联系地址</span><span class="c-content last">{{$refs.address.value}}</span></div>
            <div><span class="photo-title">身份证正面照片</span></div>
            <div><span class="photo-content">
              <img :src="$refs.cardPhotoF.dataUrl" class="id-card">
            </span></div>
            <div><span class="photo-title">身份证背面照片</span></div>
            <div><span class="photo-content">
              <img :src="$refs.cardPhotoB.dataUrl" class="id-card">
            </span></div>
          </div>
          <span slot="footer" class="dialog-footer">
          <input type="button" class="primary-btn plain" :disabled="submitting" @click="currentStep=1" value="我要修改">
          <input type="button" class="primary-btn" :disabled="submitting" @click="submitAccountInfo" value="我已确认">
        </span>
        </el-dialog>
      </template>
    </div>
    <result v-show="result.show" :result="result">
      <div slot="footer">
        <router-link :to="{name: 'account', params:{type:'in'}}"><input type="button" class="primary-btn" value="去给账户充值"></router-link>
        <router-link :to="{name: 'user'}"><input type="button" class="primary-btn plain" value="返回用户中心"></router-link>
      </div>
    </result>
  </div>
</template>
<script>
  import NameInput from '@/components/user/nameInput'
  import IdnoInput from '@/components/user/idnoInput'
  import ImageUploadInput from '@/components/user/imageUploadInput'
  import EmailInput from '@/components/user/emailInput'
  import AddressInput from '@/components/user/addressInput'
  import NewBank from '@/views/user/newbank'
  import { BANKS } from '@/utils/config'
  import Result from '@/components/user/result'

  export default{
    data(){
      return {
        fromPath    : null,
        currentStep : 1,
        submitting  : false,
        state       : {
          name       : false,
          cardNo     : false,
          email      : false,
          address    : false,
          cardPhotoF : false,
          cardPhotoB : false
        },
        postData    : {},
        result      : {
          show    : false,
          title   : '',
          content : '',
          reason  : ''
        }
      }
    },
    components : {
      NameInput,
      IdnoInput,
      ImageUploadInput,
      EmailInput,
      AddressInput,
      NewBank,
      Result
    },
    computed   : {
      forbidNext(){
        console.log('重新计算是否要禁用提交按钮')
        return (Object.values(this.state).some(e => {return e===false}))
      }
    },
    filters    : {
      fMobile(val){
        return val.substr(0, 3)+' '+val.substr(3, 4)+' '+val.substr(7, 4)
      },
      fCardNo(val){
//        return val.substr(0, 4)+' '+val.substr(4, 4)+' '+val.substr(7, 4)
        return val
      }
    },
    methods    : {
      getBankName(bcode){
        return BANKS.filter(b => {return b.code==bcode})[0].name
      },
      goNext(){
        for (let k in this.state) {
          if (this.state[k]) this.postData[k] = this.$refs[k].value
        }
        this.currentStep = 2
      },
      getBankInfo(bankInfo){
        for (let k in bankInfo) {
          this.postData[k] = bankInfo[k]
        }
        this.currentStep = 3
      },
      submitAccountInfo(){
        let postData = new FormData()
        for (let k in this.postData) {
          postData.append(k, this.postData[k])
        }

        this.submitting = true

        let _ = this
        this.$post('openAccount', postData, {
          showProgress   : '开户信息提交中，请勿重复提交...',
          showSuccessMsg : _.currentPath!=='/user/openaccount',//作为组件使用的,
          callback       : { success : successCallback, error : errorCallback, always : alwaysCallback }
        })
        function successCallback(data) {
          if (_.currentPath=='/user/openaccount') {
            _.result = { show : true, title : '开户结果', content : '恭喜您，开户成功' }
          }//作为路由使用的
          _.$store.commit('setUser', data)
        }

        function errorCallback() {
          _.currentStep = 1
        }

        function alwaysCallback() {
          _.submitting = false
        }
      }
    },
    created(){
      if (this.isOpenAccount) this.result = { show : true, title : '开户结果', content : '恭喜您，开户成功' }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.isRegister) vm.$router.push('/user')
      })
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../style/base"

  .id-card
    width calc(100vw - 25px)
    height calc(62.8vw - 15.8px)

  .no-top-line::after
    border-top none

  .confirm-tip
    margin 0 -15px
    background-color striking-text-color
    border-radius 10px
    padding 1em
    color white
    margin-bottom 1em

  #confirm-table
    margin 0 -15px
    border 1px solid striking-text-color
    div
      display flex
      flex-direction row
    span
      padding 10px
    .c-item
      flex 2
      text-align right
      background-color secondary-text-color
      color white
      border-bottom 1px solid
    .c-item.last, .c-content.last
      border-bottom none
    .c-content
      flex 3
      text-align right
      color striking-text-color
      border-bottom 1px solid
      white-space normal
      word-break break-all
      word-wrap break-word
    .photo-title
      flex 1
      text-align center
      background-color striking-text-color
      color white
      border-right 1px solid striking-text-color
      border-left 1px solid striking-text-color
    span.photo-content
      line-height 0
      flex 1
      padding 0
      background none
      img
        width 100%
        height calc(62.8vw - 14.8px)

  .el-icon-warning
    margin-right 10px
    line-height inherit

</style>
